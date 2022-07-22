import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async (req, res) => {

    const { chain, label, contract_address, id } = req.body;

    if (id)
        await prisma.nft_gating.update({
            where: {
                id: id
            },
            data: {
                chain, label, contract_address
            }
        })

    return ok(res);

})
