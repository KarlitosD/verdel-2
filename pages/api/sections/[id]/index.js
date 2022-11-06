import { createHandler, authMiddleware } from "/db/middlewares"
import Models from "/db/models/index.js"
const { Section } = Models

const handlers = {
    async PATCH(req, res){
        const { query, body } = req
        await Section.update({ ...body },{ where: { id: query.id } })
        res.send({ message: "Section edited" })
    },
    async DELETE(req, res){
        const { id } = req.query
        await Section.destroy({ where: { id } })
        res.send({ message: "Section deleted" })
    }
}

export default createHandler(authMiddleware(), handlers)