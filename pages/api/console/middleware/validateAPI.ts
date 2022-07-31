import { getSettings } from 'lib/helpers';
import prisma from 'lib/prisma';
import { oops } from 'lib/response';


const validateAPI = (handler) => {
    return async (req, res) => {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

        const { api_key } = req.query;


        const settingsData = await prisma.settings.findMany({})
        const settings = getSettings(settingsData);

        if (settings.enable_api !== true) {
            return oops(res, "API NOT ENABLED")
        }

        if (settings.api_key !== api_key) {
            return oops(res, "INVALID API KEY")
        }

        if (settings.api_ip_whitelist != "") {
            const ip_list = settings.api_ip_whitelist.split(",");

            if (!ip_list.includes(ip)) {
                return res.status(401).send()
            }
        }


        handler(req, res)
    }
}

export default validateAPI
