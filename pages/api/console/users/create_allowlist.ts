import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';
import { detectChain } from 'lib/detect_chain';

export default checkAuth(async function createAllowlist(req, res) {

    const { address, label, bulk } = req.body;

    if (address || bulk) {

        if (bulk) {
            const data = bulk.split('\n')
            const insertRecords = [];

            data.forEach(record => {
                const [address, ...rest] = record.split(' ');

                if (address) {
                    const chain = detectChain(address)

                    insertRecords.push({
                        address, label: rest.join(" "), chain
                    })
                }
            })

            await prisma.allowlist.createMany({
                data: insertRecords
            })
        }
        else {
            const chain = detectChain(address)

            await prisma.allowlist.create({
                data: {
                    address,
                    label,
                    chain
                }
            })
        }
    }

    return ok(res);

})
