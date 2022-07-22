import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async (req, res) => {

    const { chain, label, contract_address } = req.body;

    if (chain && contract_address)
        await prisma.nft_gating.create({
            data: {
                chain, label, contract_address
            }
        })

    return ok(res);

})
