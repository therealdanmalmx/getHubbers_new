import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgLoader from "vite-plugin-svgr";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    react(),
    svgLoader({
      svgrOptions: {
        icon: true,
      },
    }),
    Icons({
      jsx: "react",
      compiler: "jsx",
    }),
  ],
});
