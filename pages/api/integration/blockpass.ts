import got from "got";
import { getSettings } from "lib/helpers";
import Lang from "lib/lang";
import prisma from "lib/prisma";
import { ok, oops } from "lib/response";


export default async function blockpassUpdateStatus(req, res) {


    const settingsData = await prisma.settings.findMany({})
    const settings = getSettings(settingsData);

    // Feat: Paginate & process requests

    if (settings.blockpass_clientid && settings.blockpass_apikey) {

        const results: any = await got(`https://kyc.blockpass.org/kyc/1.0/connect/${settings.blockpass_clientid}/applicants/approved`, {
            headers: {
                "Authorization": settings.blockpass_apikey,
                "cache-control": 'no-cache'
            }
        }).json()

        const kycApprovedUserIds = results.data.records.map(r => r.refId)

        await prisma.users.updateMany({
            where: {
                id: {
                    in: kycApprovedUserIds
                }
            },
            data: {
                kyc_verified: true
            }
        })

        return ok(res);
    }

    return oops(res, Lang.INVALID_API_SECRET);
};
