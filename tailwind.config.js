/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      gridTemplateColumns: {
        't': 'repeat(3, auto)'
      },
      backgroundColor: {
        'red': '#FF0000'
      },
      borderColor: {
        'red': '#FF0000'
      },
    },
  },
  plugins: [],
}

/**If x wins o starts if o wins x starts */
