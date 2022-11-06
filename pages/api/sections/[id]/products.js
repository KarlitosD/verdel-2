import { createHandler, authMiddleware } from "/middlewares"
import Models from "/db/models/index.js"
const { Product } = Models

const handlers = {
    async GET(req, res){
        const { id: sectionId } = req.query
        const products = await Product.findAll({ where: { sectionId } })
        res.send(products)
    },
}

export default createHandler(authMiddleware(), handlers)