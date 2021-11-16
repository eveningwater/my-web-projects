import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()],
  esbuild:{
     jsxFactory:"h",
     jsxFragment:"Fragment"
  },
  server:{
     port:4001
  },
  base:"./"
})
