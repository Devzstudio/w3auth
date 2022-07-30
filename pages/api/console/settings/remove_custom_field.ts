import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

export default checkAuth(async function removeCustomField(req, res) {

    const { id } = req.body;

    if (id) {

        await prisma.custom_fields.deleteMany({
            where: {
                option_id: id
            }
        })

        await prisma.custom_fields.delete({
            where: {
                option_id: id
            }
        })
    }

    return ok(res);

})
