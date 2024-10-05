/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: '#222323', // Color personalizado
        secundary: '#A0AEC0', // Otro color personalizado
      },
    },
  },
  plugins: [],
}

