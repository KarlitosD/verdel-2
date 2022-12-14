import { ChevronDownIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import useProducts from "hooks/useProducts";
import useSections from "hooks/useSections";
import { useMemo, useState } from "react";
import Product from "./Product";

export default function Section({ section, openSection, setOpenSection }) {
  const [sectionName, setSectionName] = useState(section?.name || "")
  const [isEditable, setIsEditable] = useState(false)
  const { editSection, deleteSection } = useSections(section.listId)
  const { products, addProduct } = useProducts(section.id, section.products)

  const isOpen = useMemo(() => openSection === section.id, [openSection, section])

  const handleClick = () => {
    setOpenSection(section.id !== openSection ? section.id : "")
  }

  const toggleEditName = () => {
    setIsEditable(!isEditable)
    if(!isEditable) return 
    editSection(section.id, { name: sectionName })
  }

  const handleAddProduct = () => {
    addProduct({ name: "New Product", description: "" })
  }

  const handleDelete = () => {
    deleteSection(section.id)
  }

  return (
    <div
      className="bg-orange-600 rounded-lg overflow-hidden h-fit px-2 py-3 mx-10 my-5"
    >
      <div className="flex items-center justify-between px-6">
        <div className="flex gap-4 items-center">
          <input type="text" className="rounded-lg h-8 w-60 text-black dark:bg-white px-2" value={sectionName} readOnly={!isEditable} onChange={e => setSectionName(e.target.value)} />
          <button className="rounded-lg flex items-center" onClick={toggleEditName}>
            <PencilSquareIcon className={`h-6 w-6 transition ${isEditable ? "stroke-white": "stroke-black hover:stroke-white"}`} />
          </button>
        </div>
        <button
          onClick={handleClick}
          className="flex justify-center h-6 text-black hover:text-white w-96"
        >
          <ChevronDownIcon
            className={`h-6 w-6 transition duration-200 stroke-current ${isOpen ? "rotate-0" : "rotate-180"
              }`}
          />
        </button>
        <div className="w-72 flex justify-end">
          <button className="h-6 w-6 ">
            <TrashIcon className="h-6 w-6 transition stroke-black hover:stroke-white" onClick={handleDelete} />
          </button>
        </div>
      </div>
      <div
        className={`bg-gray-700 w-full rounded-lg max-h-72 mt-3 px-5 pt-4 pb-6 text-center text-white scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-800 scrollbar-track-gray-700 ${isOpen ? "block" : "hidden"
          }`}
      >
        <button 
          className="h-10 w-80 bg-trasparent  rounded-lg flex-1 mx-auto my-5 outline outline-offset-2 outline-orange-600 text-lg font-bold font-mono hover:bg-gray-800"
          onClick={handleAddProduct}
        >
          <p className="text-white">Nuevo producto</p>
        </button>
        {products?.map(product => (
          <Product key={product.id} product={product}/>
        ))}
      </div>
    </div>
  );
}
