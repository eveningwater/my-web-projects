
import Vue from 'vue';
import App from './App.vue';

import './components/timeline/index';

Vue.config.productionTip = false;

const vm = new Vue({
    el: "#app",
    // render:(h) => {
    //     return h(App)
    // },
    template: `<App />`,
    components: {
        App
    }
})