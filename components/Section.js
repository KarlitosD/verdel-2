import { ChevronDownIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Product from "./Product";

export default function Section() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className={`bg-orange-600 w-3/4 mx-auto rounded-lg overflow-hidden h-fit px-2 py-3 ml-5`}
    >
      <div className="flex items-center px-5 relative">
        <div className="flex gap-4 items-center">
          <input type="text" className="rounded-lg h-8 w-60"></input>
          <button className="rounded-lg flex items-center">
            <PencilSquareIcon className="h-6 w-6 transition stroke-white hover:stroke-neutral-900" />
          </button>
        </div>
        <button
          onClick={() => setIsVisible((isVisible) => !isVisible)}
          className="text-center h-6 text-white hover:text-neutral-900 absolute mt-1 left-1/2 -translate-x-1/2"
        >
          <ChevronDownIcon
            className={`h-6 w-6 transition duration-200 stroke-current ${
              isVisible ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </div>
      <div
        className={`bg-gray-700 w-full rounded-lg max-h-72 mt-3 px-5 py-7 text-center text-white scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-800 scrollbar-track-gray-700 ${
          isVisible ? "block" : "hidden"
        }`}
      >
        <button className="h-10 w-80 bg-trasparent  rounded-lg flex-1 mx-auto my-5 outline outline-offset-2 outline-orange-600 text-lg font-bold font-mono hover:bg-gray-800">
          <p>Nuevo producto (っ◔◡◔)っ</p>
        </button>
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
}
