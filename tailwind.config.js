/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        aqua: "#F45866",
        coral: "#FF8A95",
        ink: "#130D11",
        lime: "#FFBF70",
        mist: "#B89EA4",
        panel: "#21151A",
        sand: "#FFF4F1",
      },
    },
  },
  plugins: [],
}
