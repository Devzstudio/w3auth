import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

export default checkAuth(async function createTeamMember(req, res) {

    const { name, wallet_address } = req.body;

    if (wallet_address)
        await prisma.admins.create({
            data: {
                name, wallet_address
            }
        })

    return ok(res);

})
