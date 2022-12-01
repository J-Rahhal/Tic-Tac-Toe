/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      gridTemplateColumns: {
        't': 'repeat(3, auto)'
      }
    },
  },
  plugins: [],
}
