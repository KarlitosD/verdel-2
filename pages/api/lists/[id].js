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

const LISTS = [{
    id: 32131231,
    name: "Lista 1",
    sections: SECTIONS
}]

export default async function handler(req, res){
    res.json(LISTS[0])
}