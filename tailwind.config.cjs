/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        mainColor: '#77E290'
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
      backgroundImage: (theme) => ({
        'curvy-light-mode': "url('../images/bg-curvy-light-mode.svg')",
      }),
    },
  },
    variants: {
    extend: {
      backgroundImage: ['dark'],
    },
  },
  plugins: [],
}
