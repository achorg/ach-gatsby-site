/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,jsx,ts,tsx}',
        './src/templates/**/*.{js,jsx,ts,tsx}',
        './src/components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Forma DJR Display'],
            },
            fontWeight: {
                extralight: '100',
                light: '300',
                regular: 'normal',
                medium: '500',
                bold: 'bold',
                extrabold: '800',
                black: '900',
            },
            colors: {
                primary: {
                    100: '#dddbfb',
                    200: '#a8aaff',
                    400: '#5450bf',
                    500: '#3c3783',
                    800: '#232048',
                    900: '#1c1832',
                },
                accent: {
                    100: '#DBF4F8',
                    200: '#C2E5F3',
                    800: '#3A4B5E',
                    900: '#1B283B',
                },
            },
            screens: {
                xs: '480px',
            },
            typography: {
                quoteless: {
                    css: {
                        'blockquote p:first-of-type::before': {
                            content: 'none',
                        },
                        'blockquote p:first-of-type::after': {
                            content: 'none',
                        },
                    },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
