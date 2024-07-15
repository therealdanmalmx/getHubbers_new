/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "logo-text": "#D7DBDD",
        navbar: "#212F3D",
      },
    },
  },
  plugins: [],
};
