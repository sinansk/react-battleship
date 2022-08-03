/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    daisyui: {
      themes: ["aqua", "dark"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
