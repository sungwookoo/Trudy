/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'trudy': {
          DEFAULT: '#eefcef',
          'dark': '#baf3bf'
        },
      },
    },
  },
  plugins: [],
};