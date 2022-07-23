import { getAppCookies } from "lib/helpers";
import prisma from "lib/prisma";
import { ok, oops } from "lib/response";
import { NextApiRequest, NextApiResponse } from "next";


export default async function logouthandler(req: NextApiRequest, res: NextApiResponse) {

    const refreshToken = getAppCookies(req)['refresh_token']

    if (refreshToken) {

        const rt = await prisma.refresh_token.findFirst({
            where: {
                id: refreshToken
            }
        });


        if (!rt) {
            return res.json({
                error: "Invalid token"
            })
        }


        const user = await prisma.admins.findFirst({
            where: {
                admin_id: rt.user_id
            }
        });

        if (!user) {
            return res.json({
                error: "Invalid Address"
            })
        }

        await prisma.admins.update({
            where: {
                admin_id: user.admin_id
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

    return oops(res);

}
