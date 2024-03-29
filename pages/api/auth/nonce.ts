import { detectChain } from 'lib/detect_chain';
import Lang from 'lib/lang';

import { getSettings, getTokenContractDetails } from "lib/helpers";
import prisma from "lib/prisma";
import { oops } from "lib/response";
import { ethers } from "ethers";

import {
    Network,
    initializeAlchemy,
    getNftsForOwner
} from "@alch/alchemy-sdk";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { corsMiddleware } from "lib/cors";
import { NextApiRequest, NextApiResponse } from "next";


export default async function nonceHandler(req: NextApiRequest, res: NextApiResponse) {

    await corsMiddleware(req, res);

    if (req.method === "OPTIONS") {
        return res.status(200).send("ok")
    }

    const { wallet_address, chain: connectedChain } = req.body;

    if (!wallet_address) {
        return oops(res,
            Lang.INVALID_ADDRESS
        )
    }

    // connectedChain? based on this check

    let chain = detectChain(wallet_address)

    const settingsData = await prisma.settings.findMany({})
    const settings = getSettings(settingsData);

    /*
    *   IP blocklist check
    */

    if (settings.ip_blocklist != "" && req.headers['cf-connecting-ip']) {
        const userIp = req.headers['cf-connecting-ip'];
        const ipList = settings.ip_blocklist.split(",")

        if (ipList.includes(userIp)) {
            return oops(res, Lang.IP_BLOCKLIST);
        }
    }


    /*
    *   Country blocklist check
    */

    if (settings.country_blocklist != "" && req.headers['Cf-Ipcountry']) {
        const country = req.headers['Cf-Ipcountry'];
        const countriesList = settings.country_blocklist.split(",")

        if (countriesList.includes(country)) {
            return oops(res, Lang.COUNTRY_BLOCKLIST);
        }
    }


    /*
    *   Only allowlist users are allowed to login
    */

    if (settings.access_allowlist_only) {

        const addressExistonAllowlist = await prisma.allowlist.count({
            where: {
                address: wallet_address
            }
        })

        if (addressExistonAllowlist == 0) {
            return oops(res, Lang.NOT_ON_ALLOWED_LIST);

        }
    }

    /*
    *   Check address exist on Blocklist
    */

    const addressExistonBlocklist = await prisma.blocklist.count({
        where: {
            address: wallet_address
        }
    })

    if (addressExistonBlocklist != 0) {
        return oops(res, Lang.ADDRESS_BLOCKED);
    }




    /*
    *   NFT Gating
    */

    if (settings.nft_access_only) {

        /*
        *   NFT Validation from alchemy api
        */

        // [Feat] Support for other chains

        if (chain == "eth") {
            const settings = {
                apiKey: process.env.ALCHEMY_API,
                network: Network.ETH_MAINNET,       // replace it with the connected network
                maxRetries: 10,
            };
            const alchemy = initializeAlchemy(settings);
            const nftsForOwner = await getNftsForOwner(alchemy, wallet_address);
            const nftsContractAddress = nftsForOwner.ownedNfts.map(nft => nft.contract.address)


            const contractAddressExist = await prisma.nft_gating.count({
                where: {
                    contract_address: {
                        in: nftsContractAddress
                    }
                }
            })

            if (contractAddressExist == 0) {
                return oops(res, Lang.NFT_NOT_FOUND);
            }

        }
    }


    /*
    *   Token Gating
    */
    if (settings.token_gated_access_only) {

        // [Feat] Support for other chains

        if (chain == "eth") {
            const web3 = createAlchemyWeb3(
                `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`,
            );


            const tokenGatingContractAddress = await prisma.token_gating.findMany({
                select: {
                    contract_address: true,
                    value: true,
                    chain: true
                }, where: {}
            })

            const tokenContractAddress = tokenGatingContractAddress.map(i => i.contract_address)
            const tokenSettings = getTokenContractDetails(tokenGatingContractAddress)

            if (tokenContractAddress.length !== 0) {

                let allowUser = false;
                const tokenBalance = await web3.alchemy.getTokenBalances(wallet_address, tokenContractAddress)

                for (const token of tokenBalance.tokenBalances) {

                    const balance = ethers.BigNumber.from(token.tokenBalance)

                    if (balance > tokenSettings[token.contractAddress].value) {
                        allowUser = true
                    }
                }

                if (allowUser == false) {
                    return oops(res, "You dont have enough token balance to access.");

                }

            }
        }

    }




    const nonce = Math.random().toString(36).slice(2, 15);;

    const user = await prisma.user_address.findFirst({
        where: {
            wallet_address: wallet_address
        }
    });


    /*
     *   User not exist. let's create a new record.
     */

    if (!user) {
        await prisma.users.create({
            data: {
                nonce: nonce,
                user_address: {
                    create: [
                        {
                            chain,
                            wallet_address: wallet_address
                        }
                    ]
                }
            }
        })

        return res.json({
            nonce
        });

    }


    if (user.is_blocked) {
        return oops(res, Lang.ADDRESS_BLOCKED);
    }

    await prisma.users.update({
        where: {
            id: user.user_id
        },
        data: {
            nonce: nonce
        }
    });


    return res.json({
        nonce
    });
}
