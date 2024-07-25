/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "logo-text": "#D7DBDD",
        navbar: "#212F3D",
      },
      textColor: {
        "!text-green-500": "#10B981 !important",
        "!text-white": "#FFFFFF !important",
      },
    },
  },
  plugins: [],
};
