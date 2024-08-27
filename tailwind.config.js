/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#4D724D',
        'bg-variant': '#8DB48E',
        primary: '#cdcaca',
        'primary-variant': '#D5E7ED',
        white: '#fff',
        light: 'rgba(255, 255, 255, 0.6)',
        'text-color': 'rgb(0, 0, 0)',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'serif': ['Cinzel', 'serif'],
      },
      boxShadow: {
        custom: '0px 5px 20px 0px rgb(69 67 96 / 10%)',
      },
      transitionDuration: {
        400: '400ms',
      },
      width: {
        'container-lg': '75%',
        'container-md': '86%',
        'container-sm': '90%',
      },
      screens: {
        'md': '900px',
      },
    },
  },
<<<<<<< HEAD
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar'),
  ],
=======
  darkMode: 'class', // This enables dark mode with a class
  plugins: [],
>>>>>>> 2ee765bbb47141a87e10c4b7e37dacf8fef097b5
}