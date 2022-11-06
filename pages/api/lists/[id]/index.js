import { createHandler, authMiddleware } from "/middlewares"
import Models from "/db/models/index.js"
const { List, User } = Models

const handlers = {
  async POST(req, res){
    const { session } = req
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

export default createHandler(authMiddleware(), handlers)