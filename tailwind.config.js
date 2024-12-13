/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontWeight: {
        "light-350": 350,
      },
      colors: {
        "btn-blue": "#1A5BFF",
      },
    },
  },
  plugins: [],
};
