import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async (req, res) => {


    const { id } = req.body;

    if (id)
        await prisma.blocklist.delete({
            where: {
                blocklist_id: id
            }
        })

    return ok(res);

})
