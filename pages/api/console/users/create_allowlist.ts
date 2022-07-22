import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async (req, res) => {

    const { address, label } = req.body;

    if (address) {
        await prisma.allowlist.create({
            data: {
                address,
                label
            }
        })
    }

    return ok(res);

})
