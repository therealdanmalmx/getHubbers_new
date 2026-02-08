import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import svgLoader from "vite-plugin-svgr";

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
    build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
          ],
          'i18n': ['i18next', 'react-i18next'],
        }
      }
    }
  }
});
