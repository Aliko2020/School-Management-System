/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#074688',
        primaryLight: '#4877BD',
        secondary: '#679437',
        secondary2: '#84ac5d'
      }
    },
  },
  plugins: [],
}
