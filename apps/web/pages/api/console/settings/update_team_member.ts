import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

export default checkAuth(async function updateTeamMember(req, res) {

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
