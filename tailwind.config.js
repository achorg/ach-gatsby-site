/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Forma DJR Display']
      },
      fontWeight: {
        extralight: '100',
        light: '300',
        regular: 'normal',
        medium: '500',
        bold: 'bold',
        extrabold: '800',
        black: '900'
      },
      colors: {
        purple: '#5450bf',
        cyan: '#4ba8b3',
        teal: '#5ebfa4',
        green: '#b0d973',
        yellow: '#f2d888'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

