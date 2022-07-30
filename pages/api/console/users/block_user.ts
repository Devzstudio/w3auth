import { ok, oops } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

const BlockUser = checkAuth(async function blockUser(req, res) {

    const { user_id, is_blocked } = (req.body);


    if (user_id != undefined) {

        await prisma.users.update({
            where: {
                id: user_id
            },
            data: {
                is_blocked: is_blocked
            }
        })


        return ok(res);
    }
    else {
        return oops(res);
    }

})

export default BlockUser;
