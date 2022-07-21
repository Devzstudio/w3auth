import { ok } from 'lib/response';
import prisma from "lib/prisma"

export default async (req, res) => {
    // middleware validate user authentication

    const { chain, label, contract_address } = req.body;

    await prisma.nft_gating.create({
        data: {
            chain, label, contract_address
        }
    })

    return ok(res);

}
