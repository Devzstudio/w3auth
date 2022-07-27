import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';


import prisma from "lib/prisma";
import { getToken } from "lib/token";
import { serialize } from "cookie";
import { verifySignature } from "lib/verify_signature";
import { oops } from "lib/response";
import { detectChain } from "lib/detect_chain";
import { corsMiddleware } from "lib/cors";
import { getSettings } from 'lib/helpers';
import Lang from 'lib/lang';


export default async function verifyHandler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "OPTIONS") {
        return res.status(200).send("ok")
    }

    await corsMiddleware(req, res);



    const { signature, signed_message, wallet_address } = req.body;

    const chain = detectChain(wallet_address)


    if (!signature || signature == "" || signed_message == "") {
        return res.json({
            error: Lang.INVALID_SIGNATURE
        })
    }


    const verifyResponse = await verifySignature({
        chain: chain,
        signature,
        signed_message
    });

    // verifyResponse can be address / boolean

    if (verifyResponse) {

        const user_address = await prisma.user_address.findFirst({
            where: {
                wallet_address: wallet_address
            }
        });


        if (!user_address) {
            return res.json({
                error: Lang.INVALID_ADDRESS
            })
        }


        const user = await prisma.users.findFirst({
            where: {
                id: user_address.user_id
            }
        });


        if (!user) {
            return res.json({
                error: Lang.USER_NOT_FOUND
            })
        }


        const nonce = signed_message.split("Nonce:")[1].trim().split(" ")[0].trim()
        const address = signed_message.split("Address:")[1].trim().split(" ")[0].trim()

        if (address != wallet_address) {
            return res.json({
                error: Lang.INCORRECT_WALLET_ADDRESS
            })
        }


        if (nonce != user.nonce) {
            return res.json({
                error: Lang.EXPIRED_NONCE
            })
        }



        await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                last_login: new Date()
            }
        })


        const settingsData = await prisma.settings.findMany({})
        const settings = getSettings(settingsData);

        if (settings.log_user_logins) {

            await prisma.user_logins.create({
                data: {
                    user_id: user.id,
                    browser: req.headers['User-Agent"'],
                    ip: req.headers['cf-connecting-ip'],
                    country: req.headers['Cf-Ipcountry'],
                }
            })

        }

        const output = await getToken(user, {
            user_id: user.id,
            email: null
        })


        res.setHeader('Set-Cookie',
            serialize('w3_refresh_token', output.refresh_token, { path: '/', maxAge: 3600000, httpOnly: true, sameSite: "LAX" }),
        );


        return res.json({
            token: output.token,
            user_id: user.id,
        });

    }

    return oops(res)

}
