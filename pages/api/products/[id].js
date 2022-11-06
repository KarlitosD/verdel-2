import { createHandler, authMiddleware } from "/db/middlewares"
import Models from "/db/models/index.js"
const { Product } = Models

const handlers = {
    async PATCH(req, res){
        const { query, body } = req
        await Product.update({ ...body },{ where: { id: query.id } })
        res.send({ message: "Product edited" })
    },
    async DELETE(req, res){
        const { id } = req.query
        await Product.destroy({ where: { id } })
        res.send({ message: "Product deleted" })
    }
}

export default createHandler(authMiddleware(), handlers)
