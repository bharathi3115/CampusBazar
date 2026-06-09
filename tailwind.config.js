/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          maroon: '#550000',
          'dark-maroon': '#3D0000',
          burgundy: '#6D0000',
          wine: '#7A0019',
          'light-maroon': '#F8EAEA',
          dark: '#0F172A',
          gray: '#334155'
        }
      }
    },
  },
  plugins: [],
}
