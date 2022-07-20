import { ok } from 'lib/response';
import prisma from "lib/prisma"

export default async (req, res) => {
    // middleware validate user authentication

    const { address, label } = req.body;

    await prisma.allowlist.create({
        data: {
            address,
            label
        }
    })

    return ok(res);

}
