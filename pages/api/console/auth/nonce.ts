import Lang from "lib/lang";
import prisma from "lib/prisma";
import { oops } from "lib/response";
import { NextApiRequest, NextApiResponse } from "next";


export default async function noncehandler(req: NextApiRequest, res: NextApiResponse) {

    const { public_address: wallet_address } = req.body;

    if (!wallet_address) {
        return oops(res, Lang.INVALID_ADDRESS)
    }

    const nonce = Math.random().toString(36).slice(2, 15);

    const user = await prisma.admins.findFirst({
        where: {
            wallet_address: process.env.DEMO ? '0x000000000000000000000000000000000000dEaD' : wallet_address
        }
    });

    if (!user) {
        return oops(res, Lang.INVALID_ADDRESS)
    }

    await prisma.admins.update({
        where: {
            admin_id: user.admin_id
        },
        data: {
            nonce: nonce
        }
    });


    return res.json({
        nonce
    });
}
