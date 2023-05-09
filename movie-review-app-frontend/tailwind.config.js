/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgba(0,31,63, 0.75)",
        secondary: "#dee4a8",
        ternary: "#89939e",
        accent: "#e1ec2e",
      }
    },
  },
  plugins: [],
}

