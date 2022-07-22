import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async (req, res) => {

    const { name, wallet_address } = req.body;

    if (wallet_address)
        await prisma.admins.create({
            data: {
                name, wallet_address
            }
        })

    return ok(res);

})
