import Products from "db/models/Products"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { Product } from "/db/models"

const handlers = {
    async GET(req, res, session){
        const { id } = req.params
        const products = await Product.findAll({ where: { id } })
        res.send(products)
    },
    POST(req, res){
        res.send()
    }
}

export default async function handler(req, res){
    try {
        const session = unstable_getServerSession(req, res, authOptions)
        if(!session) throw new Error("No autorizado")
        const fn = handlers[req.method]
        if(fn) await fn(req, res, session)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}