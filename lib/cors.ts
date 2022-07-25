
import NextCors from 'nextjs-cors';


export const corsMiddleware = async (req, res) => {


    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', "OPTIONS"],
        origin: 'https://w3auth-demo.vercel.app',
        optionsSuccessStatus: 200,
        credentials: true,
        headers: "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, Referer, User-Agent, cookie"
    });

}
