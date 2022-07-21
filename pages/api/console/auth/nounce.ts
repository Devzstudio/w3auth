import prisma from "lib/prisma";


export default async (req, res) => {

    const { public_address: wallet_address } = req.body;

    if (!wallet_address) {
        return res.json({
            error: "Invalid address"
        })
    }

    const nounce = Math.floor(Math.random() * 1000000);

    const user = await prisma.admins.findFirst({
        where: {
            wallet_address: wallet_address
        }
    });

    if (!user) {
        return res.json({
            nounce
        })
    }

    await prisma.admins.update({
        where: {
            admin_id: user.admin_id
        },
        data: {
            nounce: String(nounce)
        }
    });


    return res.json({
        nounce
    });
}
