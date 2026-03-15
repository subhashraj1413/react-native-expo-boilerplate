/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        aqua: "#81F3D0",
        coral: "#FF8F70",
        ink: "#07131C",
        lime: "#D5FF72",
        mist: "#97ABC1",
        panel: "#102131",
        sand: "#F5EBD6",
      },
    },
  },
  plugins: [],
}
