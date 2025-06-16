/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./src/**/*.{js,jsx,ts,tsx}", // tambahkan jsx/tsx jika pakai React
  ],
  theme: {
    extend: {
      colors: {
      primary: '#1A1A1D',
      secondary: '#FFD700',
    },
    },
  },
  plugins: [],
}

