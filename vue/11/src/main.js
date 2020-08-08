import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './common.css';
Vue.use(ElementUI);
import { request } from './ajax';
Vue.prototype.request = request;
Vue.prototype.$api = "http://api.chuangyiweima.cn/api_entrance.ashx";
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
