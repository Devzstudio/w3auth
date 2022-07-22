import { getSettings } from "lib/helpers";
import prisma from "lib/prisma";

export default async (req, res) => {

    const settingsData = await prisma.settings.findMany({})
    const settings = getSettings(settingsData);


    const active_chains = {
        eth: settings.enable_eth,
        bnb: settings.enable_bnb,
        ftm: settings.enable_ftm,
        matic: settings.enable_matic,
        glmr: settings.enable_glmr,
        movr: settings.enable_movr,
        avax: settings.enable_avax,
        sol: settings.enable_sol,
    }


    return res.json({
        active_chains
    })
}
