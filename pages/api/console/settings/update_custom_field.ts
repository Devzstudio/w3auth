import { ok } from 'lib/response';
import prisma from "lib/prisma"

export default async (req, res) => {
    // middleware validate user authentication

    const { name, required, label, id } = req.body;

    await prisma.custom_fields.update({
        where: {
            option_id: id
        },
        data: {
            name,
            label,
            required
        }
    })

    return ok(res);

}
