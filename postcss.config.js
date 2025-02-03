/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {}, // Add this line to use Tailwind with PostCSS
    autoprefixer: {},
  },
};
