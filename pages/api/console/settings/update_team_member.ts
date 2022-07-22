import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async (req, res) => {

    const { wallet_address, name, id } = req.body;

    if (id)
        await prisma.admins.update({
            where: {
                admin_id: id
            },
            data: {
                wallet_address, name
            }
        })

    return ok(res);

})
