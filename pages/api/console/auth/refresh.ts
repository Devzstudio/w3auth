import { getAppCookies } from "lib/helpers";
import prisma from "lib/prisma";
import { getToken } from "lib/token";
import { serialize } from "cookie";


export default async (req, res) => {

    const refreshToken = getAppCookies(req)['refresh_token']

    if (refreshToken) {
        const rt = await prisma.refresh_token.findFirst({
            where: {
                id: refreshToken
            }
        });

        if (!rt) {
            return res.json({
                error: "Token expired"
            })
        }

        const user = await prisma.admins.findFirst({
            where: {
                admin_id: rt.user_id
            }
        });

        if (!user) {
            return res.json({
                error: "Not Exist"
            })
        }


        const output = await getToken(user)

        res.setHeader('Set-Cookie', serialize('refresh_token', output.refresh_token, { path: '/', maxAge: 3600000, httpOnly: true }));
        return res.json({
            success: "OK",
            token: output.token,
        });
    }



}
