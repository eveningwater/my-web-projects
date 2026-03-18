import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: 'main-app',
      remotes: {
        'cartoon-website': 'http://localhost:3001/assets/remoteEntry.js',
        'hacker-website': 'http://localhost:3002/assets/remoteEntry.js',
        'simple-website': 'http://localhost:3003/assets/remoteEntry.js',
      },
      shared: []
    })
  ],
  server: {
    port: 3000,
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
    cssCodeSplit: false
  }
})
