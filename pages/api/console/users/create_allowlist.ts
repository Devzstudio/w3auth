import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middleware/checkAuth';

export default checkAuth(async function createAllowlist(req, res) {

    const { address, label, bulk } = req.body;

    if (address || bulk) {

        if (bulk) {
            const data = bulk.split('\n')
            const insertRecords = [];

            data.forEach(record => {
                const [address, ...rest] = record.split(' ');

                if (address) {
                    insertRecords.push({
                        address, label: rest.join(" ")
                    })
                }
            })

            await prisma.allowlist.createMany({
                data: insertRecords
            })
        }
        else {

            await prisma.allowlist.create({
                data: {
                    address,
                    label
                }
            })
        }
    }

    return ok(res);

})
