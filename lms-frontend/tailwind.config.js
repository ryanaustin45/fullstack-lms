/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#211D45',
          light: '#2C2760',
        },
        brand: {
          from: '#7B6EF6',
          to: '#4B3AC2',
        },
        coral: '#F17E77',
        gold: '#F4C15C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
