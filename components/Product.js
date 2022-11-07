import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import useProducts from "hooks/useProducts";

export default function Product({ product }) {
  const { editProduct, deleteProduct } = useProducts(product.sectionId)
  const [productName, setProductName] = useState(product?.name || "")
  const [isEditable, setIsEditable] = useState(false)
  const handleChange = e => setProductName(e.target.value)

  const toggleEditName = () => {
    setIsEditable(!isEditable)
    if(!isEditable) return 
    editProduct(product.id, { name: productName })
  }

  const handleDelete = () => {
    deleteProduct(product.id)
  }

  return (
    <div className="bg-orange-600 rounded-lg flex items-center justify-between px-2 py-2 mt-2">
      <div className="flex items-center gap-4">
        <input type="text" className="rounded-lg h-8 max-w-100 text-black dark:bg-white" value={productName} readOnly={!isEditable} onChange={handleChange}/>
        <button className="w-6 h-6 rounded-lg" onClick={toggleEditName}>
          <PencilSquareIcon className={`h-6 w-6 transition ${isEditable ? "stroke-white": "stroke-black hover:stroke-white"}`} />
        </button>
      </div>
      <button className="w-6 h-6 rounded-lg" onClick={handleDelete}>
        <TrashIcon className="h-6 w-6 transition stroke-black hover:stroke-white" />
      </button>
    </div>
  );
}
