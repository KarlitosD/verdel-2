import { unstable_getServerSession } from "next-auth/next"
// import { uid } from "uid/secure"
import { authOptions } from 'pages/api/auth/[...nextauth]'
import Models from "/db/models/index.js"
const { List, User } = Models

const SECTIONS = [
    {
      name: "Verduleria",
      products: [
        {
          id: 1,
          name: "1L de leche",
          description: "Marca el tren",
          bought: false,
        },
        {
          id: 2,
          name: "1L de agua",
          description: "Villa del cencio o si no hay Kesten",
          bought: false,
        }
      ],
      color: 'emerald'
    }
]

const LISTS = [{
    id: 32131231,
    name: "Lista 1",
    sections: SECTIONS
}]

const handlers = {
  async GET(req, res, session){
      // const { id } = session.user
      // const lists = await List.findAll()
      res.send(LISTS)
  },
  async POST(req, res, session){
      const { id: listId } = req.query
      console.log(listId)
      const [list, user] = await Promise.all([
          List.findOne({ where: { id: listId } }), 
          User.findOne({ where: { id: session.user.id },  attributes: ['id'] })
      ])
      // console.log({ user })
      if(!list) throw new Error("List not found")
      await list.addUser(user)
      // const newList = await List.create({
      //     id: uid(20),
      //     name,
      //     creatorId: 
      // })
      res.send({ message: "User added in the list" })
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