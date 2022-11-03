const SECTIONS = [
    {
      name: "Verduleria",
      products: [
        {
          id: 1,
          name: "1L de leche",
          description: "Marca el tren",
          bought: false,
        },
        {
          id: 2,
          name: "1L de agua",
          description: "Villa del cencio o si no hay Kesten",
          bought: false,
        }
      ],
      color: 'emerald'
    }
]

export default function handler(req, res){
    res.send(SECTIONS)
}