/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#5AB2FF',
      },
      fontFamily: {
        'comforter': ['Comforter Brush', 'cursive'],
        'abril': ['"Abril Fatface"', 'cursive'],
        'pacifico':['Pacifico', 'cursive'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover'],
    },
  },
  plugins: [],
}

