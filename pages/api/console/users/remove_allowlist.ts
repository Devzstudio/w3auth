import { ok } from 'lib/response';
import prisma from "lib/prisma"

export default async (req, res) => {
    // middleware validate user authentication

    const { id } = req.body;

    await prisma.allowlist.delete({
        where: {
            allowlist_id: id
        }
    })

    return ok(res);

}
