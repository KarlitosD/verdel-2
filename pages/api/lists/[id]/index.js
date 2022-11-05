import { unstable_getServerSession } from "next-auth/next"
// import { uid } from "uid/secure"
import { authOptions } from '/pages/api/auth/[...nextauth]'
import Models from "/db/models/index.js"
const { List, User } = Models

const handlers = {
  async GET(req, res, session){
      res.send([])
  },
  async POST(req, res, session){
      const { id: listId } = req.query
      const [list, user] = await Promise.all([
          List.findOne({ where: { id: listId } }), 
          User.findOne({ where: { id: session.user.id },  attributes: ['id'] })
      ])
      if(!list) throw new Error("List not found")
      await list.addUser(user)

      res.send({ message: "User added in the list" })
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