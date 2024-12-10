/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#323338',
        secondary: '#2a2d31',
        tertiary: '#1e1f22',
        alternateBg: '#404249',
        primaryText: '#f2f3f5',
        secondaryText: '#b4b9c0',
        customGreen: '#22a559',
        customPurple: '#5965f2',
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1920px',
      },
    },
    fontFamily: {
      monserrat: ['Montserrat', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
};
