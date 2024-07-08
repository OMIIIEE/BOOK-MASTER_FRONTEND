/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        spin: {
          '0%, 100%': { transform: 'rotate(360deg)' },
          '0%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
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

