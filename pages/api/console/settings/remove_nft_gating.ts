import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

export default checkAuth(async function removeNFTGating(req, res) {

    const { id } = req.body;

    if (id) {

        await prisma.nft_gating.delete({
            where: {
                id: id
            }
        })
    }

    return ok(res);

})
