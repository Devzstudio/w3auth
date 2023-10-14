import { getSettings } from 'lib/helpers';
import prisma from 'lib/prisma';
import { response } from 'lib/response';
import validateAPI from '../middleware/validateAPI';

const addressAllowlist = validateAPI(async (req, res) => {

    const settingsData = await prisma.settings.findMany({})
    const settings = getSettings(settingsData);

    return response(res, {
        data: settings
    });
});

export default addressAllowlist;
