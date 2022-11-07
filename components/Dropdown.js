import Link from "next/link";
import { useState } from "react";

export default function Dropdown({ children, options }) {
  const [showOptions, setShowOptions] = useState(false);
  const handleClick = () => {
    setShowOptions(!showOptions);
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={handleClick}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {children}
        </button>
      </div>
      {showOptions && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          {options &&
            options.map((option) => (
              <Link
                key={option}
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
              >
                {option}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
