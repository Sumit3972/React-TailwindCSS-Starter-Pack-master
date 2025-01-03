/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': 'rgba(2, 6, 12, 0.75)', // Name your color as you like
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}