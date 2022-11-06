import { createHandler, authMiddleware } from "/server/middlewares"
import Models from "/db/models/index.js"
const { Section, Product } = Models

const handlers = {
    async GET(req, res){
        const { id: listId } = req.query
        const sections = await Section.findAll({ 
            where: { listId },
            include: Product
         })
        res.send(sections)
    },
}

export default createHandler(authMiddleware(), handlers)