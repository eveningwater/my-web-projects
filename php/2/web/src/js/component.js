import Vue from 'vue';
import examRow from '../components/row.vue';
import examCol from '../components/col.vue';
import examInput from '../components/input.vue';
import examButton from '../components/button.vue';
import examRadio from '../components/radio.vue';

const components = {
    examRow,
    examCol,
    examInput,
    examButton,
    examRadio
}

// 组件的注册
Object.keys(components).forEach((key) => {
    Vue.component(key,components[key]);
});