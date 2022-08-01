import prisma from 'lib/prisma';
import { ok, oops, response } from 'lib/response';
import validateAPI from '../middleware/validateAPI';

const nftGating = validateAPI(async (req, res) => {
    const { page: pageNumber, limit: itemsLimit } = req.query;

    let page = 1;
    let limit = 20;

    if (itemsLimit) limit = itemsLimit;

    if (itemsLimit > 100) return oops(res, "Maximum record of 100");


    if (!pageNumber) page = 0;
    else {
        if (pageNumber) page = pageNumber - 1;
    }



    const records = await prisma.nft_gating.findMany({
        skip: page ? page * limit : 0,
        take: limit,
    });

    const total = await prisma.nft_gating.count({});

    return response(res, {
        data: {
            records,
            total
        }
    });
})

export default nftGating;
