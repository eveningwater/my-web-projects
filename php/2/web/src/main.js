import Vue from 'vue'
import App from './App.vue'
import './css/common.css'
import './js/component.js'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
