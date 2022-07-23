
import NextCors from 'nextjs-cors';


export const corsMiddleware = async (req, res) => {


    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', "OPTIONS"],
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
        headers: "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, Referer, User-Agent"
    });

}
