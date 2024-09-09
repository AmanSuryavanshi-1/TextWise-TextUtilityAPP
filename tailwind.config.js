/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',       
        bg: '#12372A',
        bgVariant: '#436850',   
        primary: '#ADBC9F', 
        primaryVariant: '#FBFADA', 
        textColor: '#4A4A4A', 
       
        // bgVariant: '#6d9773', // Sage green for secondary elements
        // white: '#FBFADA',    // Light cream background
        // bg: '#0C3B2E',       // Dark green for primary elements
        // bgVariant: '#1D5E46', // Darker sage green for better contrast with bg
        // primary: '#FFB800',  // Slightly adjusted golden yellow for better visibility
        // primaryVariant: '#FFC933', // Adjusted lighter gold for hover states
        // textColor: '#333333', // Dark gray for main tex
        
        
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
      animation: {
        profile: 'profile__animate 8s ease-in-out infinite 1s',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar'),
  ],
}