import { uid } from "uid/secure"
import { createHandler, authMiddleware } from "/db/middlewares"
import Models from "/db/models"

const { Product } = Models

const handlers = {
    async POST(req, res){
        const { name, description, sectionId } = req.body
        console
        const newProduct = await Product.create({ 
            id: uid(20),
            name, 
            description,
            sectionId 
        })
        res.send({ message: "Product created", product: newProduct })
    }
}

export default createHandler(authMiddleware(), handlers)