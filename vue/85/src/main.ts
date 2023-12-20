import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/variable.css'
import './styles/common.css'
import App from './App.vue'
import router from './routes/route'

const pinia = createPinia();
const app = createApp(App);
app.use(router)
app.use(pinia).mount('#app');
