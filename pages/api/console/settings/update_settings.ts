import { ok } from 'lib/response';
import prisma from "lib/prisma"
import checkAuth from '../middlerware/checkAuth';

export default checkAuth(async function updateSettings(req, res) {

    const { settings } = req.body;


    if (settings)
        Object.keys(settings).forEach(async value => {
            if (settings[value] == true || settings[value] == false)
                await prisma.settings.update({
                    where: {
                        name: value
                    },
                    data: {
                        value: settings[value] == true ? 'true' : 'false'
                    }
                })
            else
                await prisma.settings.update({
                    where: {
                        name: value
                    },
                    data: {
                        value: settings[value]
                    }
                })
        })


    return ok(res);
})
