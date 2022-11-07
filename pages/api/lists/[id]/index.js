import { createHandler, authMiddleware } from "/server/middlewares"
import Models from "/db/models/index.js"
const { List, User } = Models

const handlers = {
  async GET(req, res){
    const { id: listId } = req.query
    const list = await List.findByPk(listId)
    if(!list) throw { status: 404, message: "List not found" }
    res.send(list)
  } 
}

export default createHandler(authMiddleware(), handlers)