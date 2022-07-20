import { ok } from 'lib/response';
import prisma from "lib/prisma"

export default async (req, res) => {
    // middleware validate user authentication

    const { address, note } = req.body;

    await prisma.blocklist.create({
        data: {
            address,
            note
        }
    })

    return ok(res);

}
