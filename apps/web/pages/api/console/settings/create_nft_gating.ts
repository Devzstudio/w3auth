import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

export default checkAuth(async function createNftGating(req, res) {

    const { chain, label, contract_address } = req.body;

    if (chain && contract_address)
        await prisma.nft_gating.create({
            data: {
                chain, label, contract_address
            }
        })

    return ok(res);

})
