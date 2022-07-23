import prisma from "lib/prisma";
import { getToken } from "lib/token";
import { verifySignature } from "lib/verify_signature";
import { serialize } from "cookie";


export default async (req, res) => {

    const { signature, signed_message } = req.body;

    if (!signature || signature == "" || signed_message == "") {
        return res.json({
            error: "Invalid signature"
        })
    }

    const address = await verifySignature({
        chain: 'eth',
        signature,
        signed_message
    });


    const user = await prisma.admins.findFirst({
        where: {
            wallet_address: address
        }
    });


    if (!user) {
        return res.json({
            error: "Account not exist"
        })
    }

    const nonce = signed_message.split(":")[1].trim();

    if (nonce != user.nonce) {
        return res.json({
            error: "Expired sign in. Try again."
        })
    }

    await prisma.admins.update({
        where: {
            admin_id: user.admin_id
        },
        data: {
            last_login: new Date()
        }
    })

    const output = await getToken(user, {
        user_id: user.admin_id,
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
