import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from './plugins/element-plus';
import ElementTable from './components/index'
import router from './router/router';

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(ElementTable);
app.mount('#app')
