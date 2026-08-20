/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chacao: {
          50: '#f0f7ff',
          100: '#e0effe',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        salamar: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          600: '#0d9488',
          700: '#0f766e',
          900: '#134e4a',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#20bd5a',
        }
      }
    },
  },
  plugins: [],
}