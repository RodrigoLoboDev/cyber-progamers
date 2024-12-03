/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cyber-app': "url('/header.jpg')",
      },
      colors: {
        'cyber-blue': '#00f7ff',
        'cyber-pink': '#ff007f',
        'cyber-purple': '#6f00ff',
      },
      fontFamily: {
        neon: ['"Press Start 2P"', 'cursive'], // Nombre que usarás en Tailwind
      },
    },
  },
  plugins: [],
}

