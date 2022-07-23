import prisma from "lib/prisma";
import { getToken } from "lib/token";
import { verifySignature } from "lib/verify_signature";
import { serialize } from "cookie";
import { getAppCookies } from "lib/helpers";


export default async (req, res) => {

    const refreshToken = getAppCookies(req)['refresh_token']

    if (refreshToken) {

        //  Feat delete old refreh token

        const rt = await prisma.refresh_token.findFirst({
            where: {
                id: refreshToken
            }
        });


        const user = await prisma.users.findFirst({
            where: {
                id: rt.user_id
            }
        });


        if (!user) {
            return res.json({
                error: "Account not exist"
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

}
