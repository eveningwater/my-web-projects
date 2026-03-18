import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: 'cartoon-website',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/main.ts',
        './createCartoonApp': './src/main.ts',
      },
      shared: [],
      // 确保资源文件被正确打包
      remotes: {}
    })
  ],
  server: {
    port: 3001,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },

  build: {
    target: 'esnext',
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,    
    rollupOptions: {
      output: {
        format: "esm",
        dir: "dist",
        // 确保资源文件被正确输出
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  // 开发模式下的配置
  define: {
    __DEV__: JSON.stringify(true)
  }
})
