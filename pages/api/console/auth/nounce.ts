import prisma from "lib/prisma";


export default async (req, res) => {

    const { wallet_address } = req.body;

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
            id: user.id
        },
        data: {
            nounce
        }
    });


    return res.json({
        nounce
    });
}
