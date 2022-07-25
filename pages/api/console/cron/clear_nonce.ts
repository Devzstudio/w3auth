import { corsMiddleware } from "lib/cors";
import prisma from "lib/prisma";
import { ok, oops } from "lib/response";

export default async function clearNonce(req, res) {
    await corsMiddleware(req, res);

    const { password } = req.query

    if (password == process.env.CRON_PASSWORD) {

        await prisma.users.updateMany({
            where: {},
            data: {
                nonce: null
            }
        })

        await prisma.admins.updateMany({
            where: {},
            data: {
                nonce: null
            }
        })

        return ok(res)
    }

    return oops(res);

}
