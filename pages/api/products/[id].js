import { createHandler, authMiddleware, withSchema } from "/server/middlewares"
import Models from "/db/models/index.js"
import { editProductSchema } from "server/schemas"
const { Product } = Models

const handlers = {
    PATCH: withSchema(editProductSchema, async (req, res) => {
        const { query, body } = req
        await Product.update({ ...body },{ where: { id: query.id } })
        res.send({ message: "Product edited" })
    }),
    async DELETE(req, res){
        const { id } = req.query
        await Product.destroy({ where: { id } })
        res.send({ message: "Product deleted" })
    }
}

export default createHandler(authMiddleware(), handlers)
