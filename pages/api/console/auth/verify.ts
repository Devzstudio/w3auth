import prisma from "lib/prisma";
import { getToken } from "lib/token";
import { verifySignature } from "lib/verify_signature";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import Lang from "lib/lang";


export default async function verifyhandler(req: NextApiRequest, res: NextApiResponse) {

    const { signature, signed_message } = req.body;

    if (!signature || signature == "" || signed_message == "") {
        return res.json({
            error: Lang.INVALID_SIGNATURE
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
            error: Lang.INVALID_ADDRESS
        })
    }

    const nonce = signed_message.split("Nonce:")[1].trim().split(" ")[0]

    if (nonce != user.nonce) {
        return res.json({
            error: Lang.EXPIRED_NONCE
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
    }, true)


    res.setHeader('Set-Cookie', serialize('refresh_token', output.refresh_token, { path: '/', maxAge: 3600000, httpOnly: true }));


    return res.json({
        token: output.token,
        name: user.name,
        user_id: user.id
    });



}
