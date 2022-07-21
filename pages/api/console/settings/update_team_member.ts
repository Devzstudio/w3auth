import { ok } from 'lib/response';
import prisma from "lib/prisma"

export default async (req, res) => {
    // middleware validate user authentication

    const { wallet_address, name, id } = req.body;

    await prisma.admins.update({
        where: {
            admin_id: id
        },
        data: {
            wallet_address, name
        }
    })

    return ok(res);

}
