import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async function removeAllowlist(req, res) {

    const { id } = req.body;

    if (id)
        await prisma.allowlist.delete({
            where: {
                allowlist_id: id
            }
        })

    return ok(res);

})
