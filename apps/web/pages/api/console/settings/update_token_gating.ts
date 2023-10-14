import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

export default checkAuth(async function updateTokenGating(req, res) {

    const { chain, value, contract_address, label, id } = req.body;

    if (id)
        await prisma.token_gating.update({
            where: {
                id: id
            },
            data: {
                chain, value, contract_address, label
            }
        })

    return ok(res);

})
