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
        "review-gray": "rgba(18, 18, 18, 0.30)",
      },
    },
  },
  plugins: [],
};
