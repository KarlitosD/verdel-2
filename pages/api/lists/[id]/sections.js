import { createHandler, authMiddleware } from "/middlewares"
import Models from "/db/models/index.js"
const { Section } = Models

const handlers = {
    async GET(req, res){
        const { id: listId } = req.query
        const sections = await Section.findAll({ where: { listId } })
        res.send(sections)
    },
}

export default createHandler(authMiddleware(), handlers)