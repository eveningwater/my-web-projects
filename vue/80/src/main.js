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
const requestLangConfig = async (type = "zh") => {
    const res = await request.get(BASE_URL + "/mock/" + type + ".json");
    if(res){
      langStore.langConfig = res;
    }
    langStore.lang = type;
};
Vue.prototype.$requestLangConfig = requestLangConfig;
new Vue({
  router,
  langStore,
  store,
  render: h => h(App),
  async created(){
    await requestLangConfig(langStore.lang);
  }
}).$mount('#app')
