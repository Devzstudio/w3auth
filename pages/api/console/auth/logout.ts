import prisma from "lib/prisma";
import { ok } from "lib/response";


export default async (req, res) => {

    const { public_address: wallet_address } = req.body;

    if (!wallet_address) {
        return res.json({
            error: "Invalid address"
        })
    }


    const user = await prisma.admins.findFirst({
        where: {
            wallet_address: wallet_address
        }
    });

    if (!user) {
        return res.json({
            error: "Invalid Address"
        })
    }

    await prisma.admins.update({
        where: {
            id: user.id
        },
        data: {
            nounce: null
        }
    });


    return ok(res)
}
