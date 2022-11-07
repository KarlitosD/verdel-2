import { createHandler, authMiddleware } from "/server/middlewares"
import Models from "/db/models/index.js"
const { List, User } = Models

const handlers = {
  async POST(req, res){
    const { session } = req
      const { id: listId } = req.query
      const [list, user] = await Promise.all([
        List.findByPk(listId), 
        User.findByPk(session.user.id, { attributes: ['id'] })
      ])
      if(!list) throw new Error("List not found")
      await list.addUser(user)
      
      res.send({ message: "User added in the list" })
  },
  async GET(req, res){
    const { id: listId } = req.query
    const list = await List.findByPk(listId)
    if(!list) throw { status: 404, message: "List not found" }
    res.send(list)
  } 
}

export default createHandler(authMiddleware(), handlers)