/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        trudy: {
          DEFAULT: "#eefcef",
          dark1: "#cbf6cf",
          dark2: "#baf3bf",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
