import Vue from 'vue'
import App from './App.vue'
import router from './router/router';
import langStore from './store/lang-store';
import store from './store/store';
import "./plugins/element-ui";
import request,{ BASE_URL } from './api/axios';
Object.keys(request).forEach(key => {
  Vue.prototype['$'+ key] = request[key];
});
Vue.config.productionTip = false;
const requestLangConfig = (type = "zh", params) => request.get(BASE_URL + "/mock/" + type + ".json", params);
new Vue({
  router,
  langStore,
  store,
  render: h => h(App),
  async created(){
    const res = await requestLangConfig("en");
    if(res)langStore.langConfig = res;
  }
}).$mount('#app')
