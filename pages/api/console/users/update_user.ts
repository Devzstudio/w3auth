import { ok, oops } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

const UpdateUser = checkAuth(async function updateUser(req, res) {

    const {
        id,
        name,
        email,
        discord_username,
        telegram_username,
        twitter_username,
        note
    } = (req.body);


    if (id != undefined) {

        await prisma.users.update({
            where: {
                id: id
            },
            data: {
                name,
                email,
                discord_username,
                telegram_username,
                twitter_username,
                note,
            }
        })


        return ok(res);
    }
    else {
        return oops(res);
    }

})

export default UpdateUser;
