import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

export default checkAuth(async function updateCustomFields(req, res) {

    const { name, required, label, id } = req.body;

    if (id)
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

})
