import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx" 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()],
  base:"./",
  server:{
    port:4002
  },
  esbuild:{
    jsxFactory:"h",
    jsxFragment:"Fragment"
  }
})
