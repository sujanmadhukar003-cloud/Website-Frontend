/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#F0FDF4',
          100: '#CCFBF1',
          200: '#99F6E4',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
        },
        slate: {
          850: '#1E293B',
          900: '#0F172A',
        }
      }
    },
  },
  plugins: [],
}
