import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '/pages/api/auth/[...nextauth]'
import Models from "/db/models/index.js"
const { Section, Product } = Models

const handlers = {
    async GET(req, res, session){
        const { id: listId } = req.query
        const sections = await Section.findAll({ where: { listId } })

        res.send(sections)
      },
  }
  
  export default async function handler(req, res){
    try {
        console.log("uwu")
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