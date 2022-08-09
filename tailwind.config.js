/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    backgroundImage: {
      "sea-bg-image": "url('../src/assets/sea-bg.jpg')",
    },
    // colors: {
    //   "playerOne-bg": "#67e8f9",
    //   "playerOne-hover": "#bef264",
    //   "playerTwo-bg": "#5eead4",
    //   "playerTwo-hover": "#67e8f9",
    // },
    extend: {},
  },
  plugins: [],
};
