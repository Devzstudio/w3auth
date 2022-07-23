import { corsMiddleware } from "lib/cors";

export default async function linkWalletHandler(req, res) {
    await corsMiddleware(req, res);

}
