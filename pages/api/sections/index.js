import { uid } from "uid/secure"
import { createHandler, authMiddleware } from "/server/middlewares"
import Models from "/db/models/index.js"
const { Section } = Models

const handlers = {
    async POST(req, res){
        const { listId, ...sectionRaw } = req.body
        const newSection = await Section.create({
          id: uid(20),
          listId,
          ...sectionRaw
        })
        res.send({ message: "Section created", section: newSection })
    }
}

export default createHandler(authMiddleware(), handlers)