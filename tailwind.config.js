/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // bg: '#1b491b',
        // bgVariant: '#8DB48E',
        // primary: '#e7f3d6',
        // primaryVariant: '#cfe7ad',
        // white: '#fff',
        // dark: '#222629',

        // Orange black
        // dark: '#000000',
        // bg: '#1E1E1E'  ,
        // white:'#FFFFFF',
        // primary:'#FFA500',
        
        // white: '#FAFAFA',    // Light grayish white background
        // bg: '#30336B',       // Deep royal blue for primary elements
        // bgVariant: '#535C68', // Medium gray for secondary elements
        // primary: '#E84118',  // Strong red for highlights and CTAs
        // primaryVariant: '#FFC312', // Bright yellow for hover states
        // textColor: '#2C3A47', // Dark gray for main text
        // accent: '#1B9CFC'     // Sky blue for accents
        
        // --color-bg:  #000000 ; 
        // --color-bg-variant: #6E6E6E;
        // --color-primary: #BCFD4C;
        // --color-primary-variant: #6d9d1b;

        white: '#FFFFFF',    
        bg: '#4D724D',       
        bgVariant: '#8DB48E', 
        primary: '#cdcaca', 
        primaryVariant: '#265226', 
        textColor: '#4A4A4A', 
        // accent: '#4CAF50'  
        
        // white: '#FBFADA',    // Light cream background
        // bg: '#0C3B2E',       // Dark green for primary elements
        // bgVariant: '#6d9773', // Sage green for secondary elements
        // primary: '#FFBA00',  // Golden yellow for highlights and CTAs
        // primaryVariant: '#FFD700', // Lighter gold for hover states
        // textColor: '#333333', // Dark gray for main text
        // accent: '#FF6B6B',

        
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
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar'),
  ],
}