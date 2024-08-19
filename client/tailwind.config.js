/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kellySlab: ['Kelly Slab', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
      colors: {
        themeBlue: '#A7B7C6',
        easyWhite: '#EBEBEB',
        lightBlack: '#1E1E1E',
        themeOrange: '#FF8E00',
      },
    },
  },
  plugins: [],
};
