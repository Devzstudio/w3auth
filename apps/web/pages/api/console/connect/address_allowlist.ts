import prisma from 'lib/prisma';
import { ok, oops, response } from 'lib/response';
import validateAPI from '../middleware/validateAPI';

const addressAllowlist = validateAPI(async (req, res) => {
    const { wallet_address } = req.query;

    if (!wallet_address) {
        return oops(res, 'You need to pass the wallet address in query');
    }

    const result = await prisma.allowlist.findFirst({
        where: {
            address: wallet_address,
        }
    });



    return response(res, {
        data: {
            wallet_address,
            status: result ? true : false,
        }
    });
});

export default addressAllowlist;
