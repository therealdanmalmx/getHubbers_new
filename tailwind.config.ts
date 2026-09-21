/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "logo-text": "#D7DBDD",
        navbar: "#212F3D",
        nordic: "#0b1326",
        nordic_shade: "#121b2e",
        nordic_asccent: "#0e1c34",
        nordic_salmon: "#ffb4ab",
      },
      textColor: {
        "!text-green-500": "#10B981 !important",
        "!text-white": "#FFFFFF !important",
      },
      screens: {
        "small-screen": { max: "376px" },
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};
