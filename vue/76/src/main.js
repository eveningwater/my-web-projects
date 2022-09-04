import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from './plugins/element-plus'
import router from './router/router'
import { request } from './api/http'
import ElementTable from './components/elementTable.vue'
import './assets/common.css'
const app = createApp(App)
app.config.globalProperties.$request = request
app.use(router).use(ElementPlus)
app.component('ElementTable', ElementTable)
app.mount('#app')
