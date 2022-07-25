import jwt_decode from "jwt-decode";
import { corsMiddleware } from "lib/cors";

export default async function linkWalletHandler(req, res) {
    await corsMiddleware(req, res);

    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1]
    const decoded: { user_id: string } = jwt_decode(token);

    // wallet_address, signed message?

}
