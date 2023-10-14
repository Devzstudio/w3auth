import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';



export default checkAuth(async function createCustomFieldhandler(req, res) {

    const { name, required, label } = req.body;

    if (name && label)
        await prisma.custom_fields.create({
            data: {
                name,
                label,
                required
            }
        })

    return ok(res);

}
)
