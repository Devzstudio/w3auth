import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async (req, res) => {

    const { list_type } = req.body;

    if (list_type) {

        if (list_type == "allowlist") {
            await prisma.allowlist.deleteMany({})
        }

        if (list_type == "blocklist") {
            await prisma.blocklist.deleteMany({})
        }

    }

    return ok(res);

})
