import { setTheme, useTheme } from "next-themes"

export default function Dropdown({ children }) {
  const { theme, setTheme } = useTheme();
  return (
    <div className="relative inline-block text-left">
      <div>
        <button id="menu-button" aria-expanded="true" aria-haspopup="true">
          {children}
        </button>
      </div>
      <div
        className="absolute left-0 z-10 mt-2 p-2 w-max origin-top-left rounded-md bg-gray-200 dark:bg-gray-700"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        <div className="py-1" role="none">
          <button
            className="bg-black rounded-2xl dark:bg-white"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            toggle
          </button>
          <button className="ml-4 text-red-500 font-semibold">Logout</button>
        </div>
      </div>
    </div>
  );
}
