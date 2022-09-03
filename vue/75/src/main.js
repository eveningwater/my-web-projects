
import Vue from 'vue';
import App from './App.vue';
import "./plugins/element-ui";
import router from "./router/route";
import { request } from "./api/http";
import ElementTable from "./components/elementTable.vue";
import "./assets/common.css";
Vue.component("ElementTable",ElementTable);
Vue.config.productionTip = false;
Vue.prototype.$request = request;
new Vue({
    el: "#app",
    router,
    render:(h) => h(App),
})