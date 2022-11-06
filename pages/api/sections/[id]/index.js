import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '/pages/api/auth/[...nextauth]'
import Models from "/db/models/index.js"
const { Section } = Models

const handlers = {
    async PATCH(req, res, session){
        const { query, body } = req
        await Section.update({ ...body },{ where: { id: query.id } })
        res.send({ message: "Section edited" })
    },
    async DELETE(req, res, session){
        const { id } = req.query
        await Section.destroy({ where: { id } })
        res.send({ message: "Section deleted" })
    }
}

export default async function handler(req, res){
    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        if(!session) throw new Error("No autorizado")
        const fn = handlers[req.method]
        if(!fn) throw new Error("Method not allowed")
        await fn(req, res, session)
    } catch (error) {
        console.log(error.message)
        res.status(400).send({ message: error.message })
    }
}