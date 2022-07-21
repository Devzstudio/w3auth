const jwt = require("jsonwebtoken")

import Config from "./config";
import prisma from "./prisma";

const JWTKey = { "type": "HS256", "key": process.env.JWT_SECRET };


export const getToken = async (user) => {

    const refresh = await prisma.refresh_token.create({
        data: {
            user_id: user.id
        }
    })

    const settings = await prisma.settings.findFirst({
        where: {
            name: "custom_jwt_claim"
        }
    })

    // loop?
    const customClaim = settings.value.replaceAll("[USER_ID]", user.id).replaceAll("[USER_EMAIL]", user.email)


    const token = jwt.sign(
        customClaim ?? {},
        JWTKey.key,
        {
            algorithm: JWTKey.type,
            expiresIn: `${process.env.JWT_TOKEN_EXPIRES}m`,
        }
    );

    return {
        token,
        refresh_token: refresh.id
    }
};
