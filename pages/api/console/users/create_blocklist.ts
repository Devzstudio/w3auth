import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async (req, res) => {

    const { address, note } = req.body;

    if (address) {
        await prisma.blocklist.create({
            data: {
                address,
                note
            }
        })
    }

    return ok(res);

})
