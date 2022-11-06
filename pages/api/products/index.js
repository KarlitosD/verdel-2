import { uid } from "uid/secure"
import { createHandler, authMiddleware, withSchema } from "/server/middlewares"
import Models from "/db/models"
import { createProductSchema } from "server/schemas"

const { Product } = Models

const handlers = {
    POST: withSchema(createProductSchema, async (req, res) => {
        const { name, description, sectionId } = req.body
        console
        const newProduct = await Product.create({ 
            id: uid(20),
            name, 
            description,
            sectionId 
        })
        res.send({ message: "Product created", product: newProduct })
    })
}

export default createHandler(authMiddleware(), handlers)