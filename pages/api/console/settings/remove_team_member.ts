import { ok, oops } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

export default checkAuth(async function removeTeamMember(req, res) {
    const { id } = req.body;

    if (id) {
        const adminsCount = await prisma.admins.count({})


        if (adminsCount > 1) {

            await prisma.admins.delete({
                where: {
                    admin_id: id
                }
            })
            return ok(res);
        }
        else {
            return oops(res, "There is only one admin account.")
        }
    }

    return oops(res);
})
