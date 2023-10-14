import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

export default checkAuth(async function createTokenGating(req, res) {

    const { chain, value, contract_address, label } = req.body;

    if (chain && contract_address)
        await prisma.token_gating.create({
            data: {
                chain, value, contract_address, label
            }
        })

    return ok(res);

})
