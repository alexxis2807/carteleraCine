/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#4169E1",
        secondary: "#1E90FF",
        "tertiary-steel": "#4682B4",
        "border-dark": "#2F4F4F",
        "gray-light": "#D3D3D3",
        terciario: "#000080",
        tertiary: "#000080",
      },
    },
  },
  plugins: [],
};
