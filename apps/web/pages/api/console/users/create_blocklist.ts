import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';
import { detectChain } from 'lib/detect_chain';

export default checkAuth(async function createBlocklist(req, res) {

    const { address, note, bulk } = req.body;

    if (address || bulk) {

        if (bulk) {
            const data = bulk.split('\n')
            const insertRecords = [];

            data.forEach(record => {
                const [address, ...rest] = record.split(' ');

                if (address) {
                    const chain = detectChain(address)

                    insertRecords.push({
                        address, note: rest.join(" "), chain
                    })
                }
            })

            await prisma.blocklist.createMany({
                data: insertRecords
            })
        }
        else {
            const chain = detectChain(address)

            await prisma.blocklist.create({
                data: {
                    address,
                    note,
                    chain
                }
            })
        }
    }

    return ok(res);

})
