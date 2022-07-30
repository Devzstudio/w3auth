import jwt_decode from "jwt-decode";
import { corsMiddleware } from "lib/cors";
import { detectChain } from "lib/detect_chain";
import Lang from "lib/lang";
import prisma from "lib/prisma";
import { ok, oops } from "lib/response";
import { verifySignature } from "lib/verify_signature";
import checkUserAuth from "../console/middleware/checkUserAuth";

export default checkUserAuth(async function linkWalletHandler(req, res) {
    await corsMiddleware(req, res);

    const { signature, signed_message, wallet_address } = req.body;

    const chain = detectChain(wallet_address)

    if (!signature || signature == "" || signed_message == "") {
        return res.json({
            error: Lang.INVALID_SIGNATURE
        })
    }

    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1]
    const decoded: { user_id: string } = jwt_decode(token);


    const verifyResponse = await verifySignature({
        chain: chain,
        signature,
        signed_message
    });


    const LinkWalletAddress = signed_message.split("Address:")[1].trim().split(" ")[0]

    if (LinkWalletAddress != wallet_address) {
        return res.json({
            error: Lang.INVALID_ADDRESS
        })
    }

    if (verifyResponse) {

        const walletLinked = await prisma.user_address.count({
            where: {
                wallet_address: wallet_address
            }
        })

        if (walletLinked == 0) {
            return ok(res, Lang.WALLET_LINK_ERROR)
        }


        const dataExist = await prisma.user_address.count({
            where: {
                user_id: decoded.user_id,
                wallet_address: wallet_address
            }
        })

        if (dataExist == 0) {

            await prisma.user_address.create({
                data: {
                    user_id: decoded.user_id,
                    chain,
                    wallet_address: wallet_address
                }
            })

            return ok(res, Lang.WALLET_LINKED_SUCCESSFULLY)
        }

        return oops(res, Lang.WALLET_ALREADY_LINKED);

    }

    return oops(res, Lang.INVALID_ADDRESS)


})
