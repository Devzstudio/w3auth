import got from "got";
import { getSettings } from "lib/helpers";
import Lang from "lib/lang";
import prisma from "lib/prisma";
import { ok, oops } from "lib/response";


export default async function blockpassUpdateStatus(req, res) {


    const settingsData = await prisma.settings.findMany({})
    const settings = getSettings(settingsData);


    if (settings.blockpass_clientid && settings.blockpass_apikey) {
        let skip = 0
        let process = true

        while (process == true) {

            const results: any = await got(`https://kyc.blockpass.org/kyc/1.0/connect/${settings.blockpass_clientid}/applicants/approved?limit=100skip=${skip}`, {
                headers: {
                    "Authorization": settings.blockpass_apikey,
                    "cache-control": 'no-cache'
                }
            }).json()

            if (results.data.records.length == 0) {
                process = false;
            }


            for (const record of results.data.records) {
                await prisma.users.updateMany({
                    where: {
                        id: record.refId
                    },
                    data: {
                        kyc_verified: true,
                        kyc_processed_id: record.blockPassID
                    }
                })
            }

            skip += 100;

        }

        return ok(res);
    }

    return oops(res, Lang.INVALID_API_SECRET);
};
