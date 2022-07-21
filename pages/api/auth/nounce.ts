// generate nounce and set that on user tables
import prisma from "lib/prisma";


export default async (req, res) => {

    const { wallet_address } = req.body;

    if (!wallet_address) {
        return res.json({
            error: "Invalid address"
        })
    }

    const nounce = Math.floor(Math.random() * 1000000);

    const user = await prisma.user_address.findFirst({
        where: {
            wallet_address: wallet_address
        }
    });

    if (!user) {
        // :P user not found.
        return res.json({
            nounce
        })
    }

    await prisma.users.update({
        where: {
            id: user.user_id
        },
        data: {
            nounce
        }
    });


    return res.json({
        nounce
    });
}
