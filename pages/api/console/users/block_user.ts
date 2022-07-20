import { ok } from 'lib/response';
import prisma from "lib/prisma"

export default async (req, res) => {
    // middleware validate user authentication

    const { user_id, is_blocked } = req.body;

    await prisma.users.update({
        where: {
            id: user_id
        },
        data: {
            is_blocked: is_blocked
        }
    })

    return ok(res);

}
