import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async (req, res) => {

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
