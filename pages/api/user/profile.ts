import prisma from "lib/prisma";
import { ok } from "lib/response";
import checkUserAuth from "../console/middlerware/checkUserAuth";
import jwt_decode from "jwt-decode";
import { corsMiddleware } from "lib/cors";

export default checkUserAuth(async function updateProfileHandler(req, res) {
    await corsMiddleware(req, res);

    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1]

    const decoded: { user_id: string } = jwt_decode(token);

    const { profile } = req.body;
    const { name, email, discord, telegram, twitter, custom } = profile;

    const user = await prisma.users.findFirst({
        where: {
            id: decoded.user_id
        }
    });

    await prisma.users.update({
        where: {
            id: decoded.user_id
        },
        data: {
            name: name ?? user.name,
            email: email ?? user.email,
            discord_username: discord ?? user.discord_username,
            telegram_username: telegram ?? user.telegram_username,
            twitter_username: twitter ?? user.twitter_username,
        }
    })

    // Feat: required field validation. (make sure all the required fields are passed to the request)

    if (custom) {
        custom.forEach(async element => {

            const option_id = await prisma.custom_fields.findFirst({
                where: {
                    name: element.name
                }
            })

            if (option_id) {
                const fieldExist = await prisma.user_custom_field.findMany({
                    select: {
                        option_id: true,
                    },
                    where: {
                        user_id: decoded.user_id,
                        option_id: option_id.option_id,
                    }
                })

                if (fieldExist.length == 0) {

                    await prisma.user_custom_field.create({
                        data: {
                            user_id: decoded.user_id,
                            option_id: option_id.option_id,
                            value: element.value
                        }
                    })

                }
                else {
                    await prisma.user_custom_field.updateMany({
                        where: {
                            user_id: decoded.user_id,
                            option_id: option_id.option_id,
                        },
                        data: {
                            value: element.value
                        }
                    })
                }


            }
        });
    }

    return ok(res);

}
)
