<<<<<<< HEAD
const config = {
  plugins: ["@tailwindcss/postcss"],
=======
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
>>>>>>> 7f4a46c (Initial commit with Firebase setup)
};

export default config;
