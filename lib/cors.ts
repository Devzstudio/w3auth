import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

export const cors = Cors({
    methods: ['POST', 'GET', 'HEAD'],
})

export function corsMiddleware(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return new Promise((resolve, reject) => {
        cors(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}
