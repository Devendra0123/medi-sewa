/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gradientColorStops: theme => ({
        ...theme('colors'),
        'primary': '#d1d5db 50%',
        'secondary': '#0e7490 50%',
        'danger': '#e3342f',
       }),
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lobster: ["Lobster", "sans-serif"],
      },
      zIndex: {
        '300': '300',
        '200': '200',
      }
    },
  },
  plugins: [],
}
