
import { getAppCookies } from "lib/helpers";
import prisma from "lib/prisma";
import { getToken } from "lib/token";
import { serialize } from "cookie";
import { verifySignature } from "lib/verify_signature";
import { oops } from "lib/response";
import { detectChain } from "lib/detect_chain";


export default async (req, res) => {

    const { signature, signed_message, wallet_address } = req.body;

    const chain = detectChain(wallet_address)


    if (!signature || signature == "" || signed_message == "") {
        return res.json({
            error: "Invalid signature"
        })
    }


    const verifyResponse = await verifySignature({
        chain: chain,
        signature,
        signed_message
    });

    // verifyResponse can be address / boolean

    if (verifyResponse) {
        // make sure the address is valid.
        // Test: is it possible to send another address via the wallet_adress and sign to account?

        const user_address = await prisma.user_address.findFirst({
            where: {
                wallet_address: wallet_address
            }
        });


        if (!user_address) {
            return res.json({
                error: "Address not exist"
            })
        }


        const user = await prisma.users.findFirst({
            where: {
                id: user_address.id
            }
        });


        if (!user) {
            return res.json({
                error: "User not found"
            })
        }


        const nounce = signed_message.split(":")[1].trim();

        if (nounce != user.nounce) {
            return res.json({
                error: "Expired sign in. Try again."
            })
        }

        await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                last_login: new Date()
            }
        })

        const output = await getToken(user, {
            user_id: user.id,
            email: null
        })


        res.setHeader('Set-Cookie', serialize('refresh_token', output.refresh_token, { path: '/', maxAge: 3600000, httpOnly: true }));


        return res.json({
            success: "OK",
            token: output.token,
            name: user.name,
            user_id: user.id
        });


    }

    return oops(res)

}
