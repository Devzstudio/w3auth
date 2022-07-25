import prisma from "lib/prisma";
import { getToken } from "lib/token";
import { serialize } from "cookie";
import { getAppCookies } from "lib/helpers";
import { corsMiddleware } from "lib/cors";
import { ok, oops } from "lib/response";
import { NextApiRequest, NextApiResponse } from "next";
import Lang from "lib/lang";

export default async function refreshHandler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method === "OPTIONS") {
        return res.status(200).send("ok")
    }

    await corsMiddleware(req, res);

    const refreshToken = getAppCookies(req)['refresh_token']

    if (refreshToken) {


        const rt = await prisma.refresh_token.findFirst({
            where: {
                id: refreshToken
            }
        });

        if (!rt) {
            return res.json({
                error: Lang.INVALID_REFRESH_TOKEN
            })
        }


        const user = await prisma.users.findFirst({
            where: {
                id: rt.user_id
            }
        });


        if (!user) {
            return res.json({
                error: Lang.INVALID_ADDRESS
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

    return oops(res, Lang.INVALID_REFRESH_TOKEN);

}
