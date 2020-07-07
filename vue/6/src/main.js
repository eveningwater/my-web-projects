// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import HeaderNav from './components/headerNav.vue'
import './assets/bootstrap.min.css'
import './assets/common.css'

Vue.component('HeaderNav',HeaderNav);
Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
	el: '#app',
	router,
	store,
	render:h => h(App)
});
export default app;
