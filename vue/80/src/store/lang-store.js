import Vue from 'vue';
import defaultLang from '../config/lang';

const langStore = Vue.observable({
    langConfig: defaultLang,
    lang:"en"
});

Vue.mixin({
    beforeCreate() {
        this.$langStore = langStore;
    }
});
export default langStore;