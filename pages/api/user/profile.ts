import { corsMiddleware } from "lib/cors";

// custom profile field
export default async function updateProfileHandler(req, res) {
    await corsMiddleware(req, res);

}
