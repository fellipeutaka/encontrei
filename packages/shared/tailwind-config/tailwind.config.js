const colors = require("tailwindcss/colors");

/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/screens/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },
    },
  },
  plugins: [],
};

module.exports = {
  colors,
  config,
};
