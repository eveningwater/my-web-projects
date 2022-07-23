import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  base: "./",
  server: {
    port: 40061,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "~",
        replacement: path.resolve(__dirname, "src/assets"),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/variable.scss";`,
      },
    },
  },
});
