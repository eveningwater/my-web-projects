import { createApp } from 'vue'
import App from './App.vue'
import * as echarts from 'echarts';
import NoData from './components/NoData.vue';
import Chart from './components/Chart.vue';
const app = createApp(App);
[NoData,Chart].forEach(component => app.component(component.name,component));
// const getName = (component) => component.__file.split('/').pop().replace(/\.\w+/,'');
// [NoData,Chart].forEach(component => app.component(getName(component),component));
app.config.globalProperties.$createChart = echarts;
app.mount('#app');