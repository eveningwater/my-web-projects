const App = {
    setup() {
        const state = Vue.reactive({
            distance: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            direction: "left",
            background: "#2396ef",
            maxHorValue: 0,
            maxVerValue: 0,
            boxEl: null
        });
        Vue.onBeforeUpdate(() => {
            state.boxEl = null
        })
        Vue.onMounted(() => {
            new ewColorPicker({
                el: "#color-picker",
                sure: (color) => {
                    state.background = color;
                },
                clear: () => {
                    state.background = "#2396ef";
                }
            })
            // 元素有一个本身的宽高为150，所以要减去
            state.maxHorValue = state.boxEl.offsetWidth - 150;
            state.maxVerValue = state.boxEl.offsetHeight - 150;
        })
        return {
            state
        }
    }
};
const app = Vue.createApp(App);
app.directive('fixed', {
    mounted(el, binding) {
        const s = binding.arg || 'top';
        el.style[s] = binding.value + 'px'
    },
    updated(el, binding) {
        const s = binding.arg || 'top'
        const css = el.style.cssText;
        ['left', 'right', 'bottom', 'top'].forEach(item => {
            if (item !== s) {
                if (css.indexOf(item) > -1) {
                    el.style[item] = null;
                }
            }
        })
        el.style[s] = binding.value + 'px'
    }
})
app.mount('#app');