const jwt = require("jsonwebtoken")

import prisma from "./prisma";





export const getUserToken = async (user, customClaims = {}) => {


    const JWTKey = { "type": "HS256", "key": process.env.JWT_SECRET };

    const refresh = await prisma.refresh_token.create({
        data: {
            user_id: user.id ?? user.admin_id
        }
    })

    const settings = await prisma.settings.findFirst({
        where: {
            name: "custom_jwt_claim"
        }
    })

    let userWallets = ''

    if (settings.value.includes("USER_WALLETS")) {

        const wallets = await prisma.user_address.findMany({
            where: {
                user_id: user.id
            }
        })

        userWallets = wallets.map(i => i.wallet_address).join(",")
    }


    const customClaim = JSON.parse(settings.value.replaceAll("[USER_ID]", user.id).replaceAll("[USER_EMAIL]", user.email).replaceAll("[USER_NAME]", user.name).replaceAll("[USER_KYC_STATUS]", user.kyc_verified).replaceAll("[USER_KYC_PROCESS_ID]", user.kyc_processed_id)).replaceAll("[USER_WALLETS]", userWallets)


    const token = jwt.sign(
        {
            ...customClaim,
            ...customClaims
        },
        JWTKey.key,
        {
            algorithm: JWTKey.type,
            expiresIn: '4h'
        }
    );

    return {
        token,
        refresh_token: refresh.id
    }
};



export const getAdminToken = async (user, customClaims = {}) => {


    const JWTKey = { "type": "HS256", "key": process.env.ADMIN_JWT_SECRET };

    const refresh = await prisma.refresh_token.create({
        data: {
            user_id: user.id ?? user.admin_id
        }
    })


    const token = jwt.sign(
        {
            ...customClaims
        },
        JWTKey.key,
        {
            algorithm: JWTKey.type,
            expiresIn: '4h'
        }
    );

    return {
        token,
        refresh_token: refresh.id
    }
};
