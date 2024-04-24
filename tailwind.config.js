import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.ts",  // Tambahkan ini jika Anda menggunakan JSX
    "./resources/**/*.tsx",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
    "./resources/**/*.scss",
  ],
  theme: {
    extend: {
      screens: {
          xs: '500px',
          tab: '845px'
      },
    },
  },
  plugins: [daisyui],
}

