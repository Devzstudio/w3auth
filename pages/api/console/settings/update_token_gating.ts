import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async (req, res) => {

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
