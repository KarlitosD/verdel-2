import { uid } from "uid/secure"
import { createHandler, authMiddleware } from "/middlewares"
import Models from "/db/models/index.js"
const { List, User } = Models

const handlers = {
    async GET(req, res){
        const { id } = req.session.user
        const user = await User.findByPk(id, { attributes: ["id"] })
        const lists = await user.getLists()
        console.log(JSON.stringify(lists, null, 2))
        res.send(lists)
    },
    async POST(req, res){
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
    }
}

export default createHandler(authMiddleware(), handlers)