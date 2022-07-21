import { ok } from 'lib/response';
import prisma from "lib/prisma"

export default async (req, res) => {
    // middleware validate user authentication

    const { name, wallet_address } = req.body;

    await prisma.admins.create({
        data: {
            name, wallet_address
        }
    })

    return ok(res);

}
