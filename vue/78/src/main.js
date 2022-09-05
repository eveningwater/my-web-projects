import Vue from 'vue'
import App from './App.vue'
import $message,{ Message } from "./utils/message"
Vue.config.productionTip = false;
Vue.prototype.$message = option => new Message(option);
Object.keys($message).forEach(key => Vue.prototype.$message[key] = $message[key]);
new Vue({
  render: h => h(App),
}).$mount('#app')
