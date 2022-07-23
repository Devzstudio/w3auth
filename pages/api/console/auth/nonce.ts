import prisma from "lib/prisma";


export default async (req, res) => {

    const { public_address: wallet_address } = req.body;

    if (!wallet_address) {
        return res.json({
            error: "Invalid address"
        })
    }

    const nonce = Math.random().toString(36).slice(2, 15);

    const user = await prisma.admins.findFirst({
        where: {
            wallet_address: wallet_address
        }
    });

    if (!user) {
        return res.json({
            nonce
        })
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
