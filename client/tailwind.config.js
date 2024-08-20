/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kellySlab: ['Kelly Slab', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        hammerSwing: {
          '0%': { transform: 'rotate(25deg)' },
          '75%': { transform: 'rotate(-75deg)' },
          '100%': { transform: 'rotate(25deg)' },
        },
      },
      animation: {
        'hammer-swing': 'hammerSwing 4s ease-in-out infinite',
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
