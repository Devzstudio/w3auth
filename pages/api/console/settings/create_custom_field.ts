import { ok } from 'lib/response';
import prisma from "lib/prisma"

export default async (req, res) => {
    // middleware validate user authentication

    const { name, required, label } = req.body;

    await prisma.custom_fields.create({
        data: {
            name,
            label,
            required
        }
    })

    return ok(res);

}
