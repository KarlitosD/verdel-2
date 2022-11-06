import { unstable_getServerSession } from "next-auth/next"
import { uid } from "uid/secure"
import { authOptions } from '/pages/api/auth/[...nextauth]'
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

export default async function handler(req, res){
    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        if(!session) throw new Error("No autorizado")
        const fn = handlers[req.method]
        if(fn) await fn(req, res, session)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}