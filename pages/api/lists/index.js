import { uid } from "uid/secure"
import { createHandler, authMiddleware, withSchema } from "/server/middlewares"
import Models from "/db/models/index.js"
import { editCreateListSchema } from "server/schemas"
const { List, User } = Models

const handlers = {
    async GET(req, res){
        const { id } = req.session.user
        const { lists } = await User.findByPk(id, { 
            attributes: ["id"],
            include: {
                model: List,
                through: {
                    attributes: []
                }
            }
        })
        res.send(lists)
    },
    POST: withSchema(editCreateListSchema, async (req, res) => {
        const { body: { name }, session } = req
        const [newList, creator] = await Promise.all([
            List.create({
                id: uid(20),
                name,
                creatorId: session.user.id
            }),
            User.findByPk(session.user.id, { attributes: ["id"] })
        ])
        await newList.addUser(creator)
        res.send({ message: "List created", list: newList })
    })
}

export default createHandler(authMiddleware(), handlers)