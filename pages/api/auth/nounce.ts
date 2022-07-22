
import { getSettings } from "lib/helpers";
import prisma from "lib/prisma";
import { oops } from "lib/response";
import { ethers } from "ethers";

import {
    Network,
    initializeAlchemy,
    getNftsForOwner
} from "@alch/alchemy-sdk";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";


// 1. ----allowlist enabled? check address on allowlist addresses
// 2. ----user blocked?
// 3. ----address exist on blocklist. block it
// 4. ----nft gating enabled? does the wallet contains the nft?
// 5. ----token gating enabled? does the wallet contains tokens

export default async (req, res) => {

    const { wallet_address, profile } = req.body;

    if (!wallet_address) {
        return res.json({
            error: "Invalid address"
        })
    }

    let chain = "eth"; // ability to use solana address / pass chain from frontend app

    const settingsData = await prisma.settings.findMany({})
    const settings = getSettings(settingsData);

    /*
    *   Only allowalist users are allowed to login
    */

    if (settings.access_allowlist_only) {

        const addressExistonAllowlist = await prisma.allowlist.count({
            where: {
                address: wallet_address
            }
        })

        if (addressExistonAllowlist == 0) {
            return oops(res, "Wallet address not found on allowlist");

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
        return oops(res, "You are not allowed to sign in.");
    }




    /*
    *   NFT Gating
    */

    if (settings.nft_access_only) {

        /*
        *   NFT Validation from alchemy api
        */

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
                return oops(res, "NFT not found on account.");
            }

        }
    }


    /*
    *   Token Gating
    */
    if (settings.token_gated_access_only) {

        if (chain == "eth") {
            const web3 = createAlchemyWeb3(
                `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`,
            );

            const tokenBalance = await web3.alchemy.getTokenBalances(wallet_address, [settings.token_gating_contract_address])

            const balance = ethers.BigNumber.from(tokenBalance.tokenBalances[0].tokenBalance)

            if (balance < settings.token_gating_amount_required) {
                return oops(res, "You dont have enough token balance to access.");
            }
        }

    }




    const nounce = Math.random().toString(36).slice(2, 15);;

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
                name: profile.name ?? null,
                nounce: nounce,
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
            nounce
        });

    }


    if (user.is_blocked) {
        return oops(res, "You are not allowed to sign in.");
    }

    await prisma.users.update({
        where: {
            id: user.user_id
        },
        data: {
            nounce: nounce
        }
    });


    return res.json({
        nounce
    });
}
