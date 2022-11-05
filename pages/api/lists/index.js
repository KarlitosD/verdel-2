import { unstable_getServerSession } from "next-auth/next"
import { uid } from "uid/secure"
import { authOptions } from 'pages/api/auth/[...nextauth]'
import Models from "/db/models/index.js"
const { List } = Models

const handlers = {
    async GET(req, res, session){
        // const { id } = session.user
        const lists = await List.findAll()
        res.send(lists)
    },
    async POST(req, res, session){
        const { name } = req.body
        const newList = await List.create({
            id: uid(20),
            name,
            creatorId: session.user.id
        })
        console.log(newList)
        // const newList = {}
        res.send({ message: "List created", list: newList })
    }
}

export default async function handler(req, res){
    try {
        console.log("Uwu")
        const session = await unstable_getServerSession(req, res, authOptions)
        if(!session) throw new Error("No autorizado")
        const fn = handlers[req.method]
        if(fn) await fn(req, res, session)
    } catch (error) {
        console.log(error.message)
        res.status(400).send({ message: error.message })
    }
}