import { createHandler, authMiddleware, withSchema } from "/server/middlewares"
import Models from "/db/models/index.js"
import { editSectionSchema } from "server/schemas"
const { Section } = Models

const handlers = {
    PATCH: withSchema(editSectionSchema, async (req, res) => {
        const { query, body } = req
        await Section.update({ ...body },{ where: { id: query.id } })
        res.send({ message: "Section edited" })
    }),
    async DELETE(req, res){
        const { id } = req.query
        await Section.destroy({ where: { id } })
        res.send({ message: "Section deleted" })
    }
}

export default createHandler(authMiddleware(), handlers)