import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import alias from "@rollup/plugin-alias"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx(),alias({
     entries:[
        { find:"~",replacement:"./src/assets"}
     ]
  })],
  esbuild:{
     jsxFactory:"h",
     jsxFragment:"Fragment"
  },
  base:"./",
  server:{
     port:8081
  }
})
