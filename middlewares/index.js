import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '/pages/api/auth/[...nextauth]'

export const useHandler = (...args) => async (req, res) => {
    try {
        const middlewares = args.slice(0, -1)
        for(middleware of middlewares)
            middlewares(req, res)
        const handlers = args.at(-1)
        const fn = handlers[req.method]
        if(!fn) throw { status: 405, message: "Method not allowed" }
        await fn(req, res, session)
    } catch ({ status = 500, message }) {
        console.log(error.message)
        res.status(status).send({ message })
    }
}

export const authMiddleware = (status = 401) => async (req, res) => {
    const messages = { 404: "Not found", 401: "Unauthorized" }
    const session = await unstable_getServerSession(req, res, authOptions)
    if(!session) throw { status, message: messages[status] || messages[401] }
    req.session = session
}

export const withSchema = (schema, property = "body", handler) => async (req, res) => {
    const result = schema.safeParse(req[property])
    if(!result.success && result.error) throw { status: 400, message: result.error }
    await handler(req, res)
}