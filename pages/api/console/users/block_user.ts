import { ok, oops } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

const BlockUser = (async (req, res) => {

    const { user_id, is_blocked } = req.body;
    console.log(res.body)

    try {


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
    catch (e) {
        console.log(e)
        return oops(res);
    }

})

export default BlockUser;
