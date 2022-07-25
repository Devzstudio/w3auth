import { corsMiddleware } from "lib/cors";
import Lang from "lib/lang";
import prisma from "lib/prisma";
import { ok, oops } from "lib/response";

export default async function clearTokens(req, res) {
    await corsMiddleware(req, res);

    const { password } = req.query

    if (password == process.env.CRON_PASSWORD) {

        await prisma.refresh_token.deleteMany({
            where: {}
        })

        return ok(res)
    }

    return oops(res, Lang.INCORRECT_CRON_PASSWORD);

}
