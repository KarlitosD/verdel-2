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
      minimal: {}
    }
    const list = await List.findByPk(listId, {
      include: includes[include]
    })
    if(!list) throw { status: 404, message: "List not found" }
    res.send(list)
  },
  async PATCH(req, res){
    const { query, body } = req
    await List.update({ ...body },{ where: { id: query.id } })
    res.send({ message: "List edited" })
  },
  async DELETE(req, res){
    const { id } = req.query
    await List.destroy({ where: { id } })
    res.send({ message: "List deleted" })
}
}

export default createHandler(authMiddleware(), handlers)