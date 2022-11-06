import { uid } from "uid/secure"
import { createHandler, authMiddleware, withSchema } from "/server/middlewares"
import Models from "/db/models/index.js"
import { createSectionSchema } from "server/schemas"
const { Section } = Models

const handlers = {
    POST: withSchema(createSectionSchema, async (req, res) => {
      const { listId, ...sectionRaw } = req.body
      const newSection = await Section.create({
        id: uid(20),
        listId,
        ...sectionRaw
      })
      res.send({ message: "Section created", section: newSection })
  })
}

export default createHandler(authMiddleware(), handlers)