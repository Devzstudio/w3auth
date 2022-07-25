import prisma from "lib/prisma";
import { ok } from "lib/response";
import checkAuth from "../console/middlerware/checkAuth";
import jwt_decode from "jwt-decode";
import { corsMiddleware } from "lib/cors";

export default checkAuth(async function updateProfileHandler(req, res) {
    await corsMiddleware(req, res);

    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1]

    const decoded: { user_id: string } = jwt_decode(token);

    const { custom } = req.body;

    if (custom) {
        custom.forEach(async element => {

            const option_id = await prisma.custom_fields.findFirst({
                where: {
                    name: element.name
                }
            })

            if (option_id) {
                await prisma.user_custom_field.create({
                    data: {
                        option_id: option_id.option_id,
                        value: element.value,
                        user_id: decoded.user_id
                    }
                })

            }
        });
    }

    return ok(res);

}
)
