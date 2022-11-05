const { COLORS, COLOR_A } = require("./utils/colors")

const generateColorSafe = preffix => {
  const colorWithout = COLORS.map(color => COLOR_A.map(i => `${preffix}-${color}-${i}`)).flat(1)
  return [...colorWithout, ...colorWithout.map(color => "hover:" + color)]
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    ...generateColorSafe("bg"),
    ...generateColorSafe("text"),
  ]
}
