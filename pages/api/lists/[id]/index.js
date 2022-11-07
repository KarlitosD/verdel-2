import { createHandler, authMiddleware } from "/server/middlewares"
import Models from "/db/models/index.js"
const { List, User, Section, Product } = Models

const handlers = {
  async GET(req, res){
    const { id: listId, include="all" } = req.query
    const includes = {
      all: [
        { model: User, through: { attributes: [] } },
        { model: Section, include: Product },
      ],
      users: { model: User, through: { attributes: [] } },
      sections: { model: Section},
      products: { model: Section, include: Product },
    }
    const list = await List.findByPk(listId, {
      include: includes[include]
    })
    if(!list) throw { status: 404, message: "List not found" }
    res.send(list)
  } 
}

export default createHandler(authMiddleware(), handlers)