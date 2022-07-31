import { ok, oops } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';
import Lang from 'lib/lang';

export default checkAuth(async function unlinkWallet(req, res) {
    const { id } = req.body;

    if (id) {

        const wallet = await prisma.user_address.findFirst({
            where: {
                user_address_id: id
            }
        })


        const userWalletsCount = await prisma.user_address.count({
            where: {
                user_id: wallet.user_id
            }
        })


        if (userWalletsCount <= 1) {
            return oops(res, Lang.WALLET_REMOVE_PRIMARY)
        }


        if (userWalletsCount > 1) {
            await prisma.user_address.deleteMany({
                where: {
                    user_address_id: id
                }
            })

            return ok(res)
        }


    }

    return oops(res);

})
