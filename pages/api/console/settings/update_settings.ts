import { ok } from 'lib/response';
import prisma from "lib/prisma"

export default async (req, res) => {
    // middleware validate user authentication

    const { settings } = req.body;


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
}
