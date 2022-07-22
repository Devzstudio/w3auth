import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async (req, res) => {

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
