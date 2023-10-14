import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

export default checkAuth(async function removeBlocklist(req, res) {


    const { id } = req.body;

    if (id)
        await prisma.blocklist.delete({
            where: {
                blocklist_id: id
            }
        })

    return ok(res);

})
