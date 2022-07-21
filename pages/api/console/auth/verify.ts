import prisma from "lib/prisma";
import { getToken } from "lib/token";
import { verifySignature } from "lib/verify_signature";


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

    const nounce = signed_message.split(":")[1].trim();

    if (nounce != user.nounce) {
        return res.json({
            error: "Expired sign in. Try again."
        })
    }


    const output = await getToken(user)

    res.cookie('refresh_token', output.refresh_token, { maxAge: 3600000, httpOnly: true });

    return res.json({
        success: "OK",
        token: output.token,
        name: user.name,
        email: user.email,
        user_id: user.id
    });


    return res.json({

    });
}
