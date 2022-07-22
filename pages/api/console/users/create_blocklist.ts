import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async (req, res) => {

    const { address, note, bulk } = req.body;

    if (address || bulk) {

        if (bulk) {
            const data = bulk.split('\n')
            const insertRecords = [];

            data.forEach(record => {
                const [address, ...rest] = record.split(' ');

                if (address) {
                    insertRecords.push({
                        address, note: rest.join(" ")
                    })
                }
            })

            await prisma.blocklist.createMany({
                data: insertRecords
            })
        }
        else {


            await prisma.blocklist.create({
                data: {
                    address,
                    note
                }
            })
        }
    }

    return ok(res);

})
