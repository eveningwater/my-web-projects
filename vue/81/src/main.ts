
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import "./style/reset.scss"

const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
