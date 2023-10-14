import { corsMiddleware } from "lib/cors";
import { getAppCookies } from "lib/helpers";
import Lang from "lib/lang";
import prisma from "lib/prisma";
import { ok, oops, response } from "lib/response";
import { NextApiRequest, NextApiResponse } from "next";


export default async function LogoutHandler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "OPTIONS") {
        return res.status(200).send("ok")
    }

    await corsMiddleware(req, res);


    const refreshToken = getAppCookies(req)['w3_refresh_token']

    if (refreshToken) {

        const rt = await prisma.refresh_token.findFirst({
            where: {
                id: refreshToken
            }
        });


        if (!rt) {
            return response(res, {
                error: Lang.INVALID_REFRESH_TOKEN
            })
        }


        const user = await prisma.users.findFirst({
            where: {
                id: rt.user_id
            }
        });

        if (!user) {
            return response(res, {
                error: Lang.INVALID_ADDRESS
            })
        }

        await prisma.users.update({
            where: {
                id: rt.user_id
            },
            data: {
                nonce: null
            }
        });

        await prisma.refresh_token.deleteMany({
            where: {
                user_id: rt.user_id
            }
        })

        return ok(res)
    }

    return oops(res, Lang.INVALID_REFRESH_TOKEN);

}
