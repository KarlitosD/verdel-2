import { unstable_getServerSession } from "next-auth/next"
import { uid } from "uid/secure"
import { authOptions } from '/pages/api/auth/[...nextauth]'
import Models from "/db/models/index.js"
const { Section } = Models

const handlers = {
    async POST(req, res, session){
        const { listId, ...sectionRaw } = req.body
        const newSection = await Section.create({
          id: uid(20),
          listId,
          ...sectionRaw
        })
        console.log(JSON.stringify(newSection, null, 2))
        res.send({ message: "Section created", section: newSection })
    }
}

export default async function handler(req, res){
    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        if(!session) throw new Error("No autorizado")
        const fn = handlers[req.method]
        if(fn) await fn(req, res, session)
    } catch (error) {
        console.log(error.message)
        res.status(400).send({ message: error.message })
    }
}