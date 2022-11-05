import { unstable_getServerSession } from "next-auth/next"
import { uid } from "uid/secure"
import { authOptions } from '/pages/api/auth/[...nextauth]'
import Models from "/db/models/index.js"
const { List, User } = Models

const handlers = {
    async GET(req, res, session){
        const { id } = session.user
        const user = await User.findByPk(id, { attributes: ["id"] })
        const lists = await user.getLists()
        console.log(JSON.stringify(lists, null, 2))
        res.send(lists)
    },
    async POST(req, res, session){
        const { name } = req.body
        const [newList, creator] = await Promise.all([
            List.create({
                id: uid(20),
                name,
                creatorId: session.user.id
            }),
            User.findByPk(session.user.id, { attributes: ["id"] })
        ])
        await newList.addUser(creator)
        res.send({ message: "List created", list: newList })
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