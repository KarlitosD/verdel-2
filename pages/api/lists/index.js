import { unstable_getServerSession } from "next-auth/next"
import { uid } from "uid"
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { Group } from "/db/models"

const handlers = {
    async GET(req, res, session){
        // const { id } = session.user
        const groups = await Group.findAll()
        res.send(groups)
    },
    async POST(req, res){
        
        const { name } = req.body
        
        const newGroup = await Group.create({
            id: uid(20),
            name
        })
        res.send({ message: "Group created" })
    }
}

export default async function handler(req, res){
    try {
        const session = unstable_getServerSession(req, res, authOptions)
        if(!session) throw new Error("No autorizado")
        const fn = handlers[req.method]
        if(fn) await fn(req, res, session)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}