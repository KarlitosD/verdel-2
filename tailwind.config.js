const COLORS = [ 'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose' ]
const COLOR_A = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"]

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
