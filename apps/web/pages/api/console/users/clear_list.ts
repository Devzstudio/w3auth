import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

export default checkAuth(async function clearList(req, res) {

    const { list_type, user_id } = req.body;

    if (list_type) {

        if (list_type == "allowlist") {
            await prisma.allowlist.deleteMany({})
        }

        if (list_type == "blocklist") {
            await prisma.blocklist.deleteMany({})
        }

        if (list_type == "user_logs") {
            await prisma.user_logins.deleteMany({
                where: {
                    user_id
                }
            })
        }

    }

    return ok(res);

})
