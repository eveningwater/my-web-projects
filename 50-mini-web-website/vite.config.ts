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
  },
  build:{
   assetsInlineLimit:0,
   cssTarget:"chrome61",
   /**
    * This options allows users to set a different browser target for CSS minification from the one used for JavaScript transpilation.
      It should only be used when you are targeting a non-mainstream browser. 
      One example is Android WeChat WebView, which supports most modern JavaScript features but not the #RGBA hexadecimal color 
      notation in CSS.
       In this case, you need to set build.cssTarget to `chrome61` to prevent vite from transform rgba() colors into #RGBA 
       hexadecimal notations.Take a look at the doc:https://vitejs.dev/config/#build-csstarget
    */
  }
})
