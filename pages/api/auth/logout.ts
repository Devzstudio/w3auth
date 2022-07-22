import { corsMiddleware } from "lib/cors";
import { getAppCookies } from "lib/helpers";
import prisma from "lib/prisma";
import { ok, oops } from "lib/response";


export default async (req, res) => {

    corsMiddleware(req, res)

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


        const user = await prisma.users.findFirst({
            where: {
                id: rt.user_id
            }
        });

        if (!user) {
            return res.json({
                error: "Invalid Address"
            })
        }

        await prisma.users.update({
            where: {
                id: rt.user_id
            },
            data: {
                nounce: null
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
