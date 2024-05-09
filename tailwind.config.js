/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "color-primario": "#67E8F9",
        "color-secundario": "#164E63",
        "color-terciario": "#155E75",
      },
    },
  },
  plugins: [],
};
