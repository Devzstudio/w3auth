import { getAppCookies } from "./helpers";
import prisma from "./prisma";

const redirectToLogin = {
    redirect: {
        permanent: false,
        destination: "/",
    },
    props: {},
};

export const validateCookie = async (req, handler) => {

    const refreshToken = getAppCookies(req.req)['refresh_token']

    if (!refreshToken) {
        return redirectToLogin;
    }

    const rt = await prisma.refresh_token.findFirst({
        where: {
            id: refreshToken
        }
    });

    if (!rt) {
        return redirectToLogin;
    }

    return handler()

}
