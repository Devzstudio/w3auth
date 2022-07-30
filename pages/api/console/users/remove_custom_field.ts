import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async function removeCustomField(req, res) {


    const { id } = req.body;

    if (id)
        await prisma.user_custom_field.delete({
            where: {
                field_id: id
            }
        })

    return ok(res);

})
