import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Product({ product }) {
  return (
    <div className="bg-orange-600 rounded-lg flex items-center justify-between px-2 py-2 mt-2">
      <div className="flex items-center gap-4">
        <input type="text" className="rounded-lg h-8 max-w-100" value={product?.name} readOnly/>
        <button className="w-6 h-6 rounded-lg">
          <PencilSquareIcon className="h-6 w-6 transition stroke-current hover:stroke-neutral-900" />
        </button>
      </div>
      <button className="w-6 h-6 rounded-lg">
        <TrashIcon className="h-6 w-6 transition stroke-current hover:stroke-neutral-900" />
      </button>
    </div>
  );
}
