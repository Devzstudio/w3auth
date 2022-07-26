import { verify } from 'jsonwebtoken'

// User Authentication

const checkUserAuth = (handler) => {
    return async (req, res) => {
        try {
            const authorization = req.headers["authorization"]

            if (!authorization) throw new Error("not authenticated")
            const token = authorization.split(" ")[1]


            verify(token, process.env.JWT_SECRET);

            handler(req, res)
        } catch (e) {
            res.status(401).send()
        }
    }
}

export default checkUserAuth
