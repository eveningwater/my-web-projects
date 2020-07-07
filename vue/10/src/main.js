import Vue from 'vue'
import App from './App.vue'
import "./assets/common.css";

Vue.config.productionTip = false;

import { consoleInfo } from './js/console';
consoleInfo();

new Vue({
  render: h => h(App),
}).$mount('#app')
