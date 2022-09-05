<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { onMounted, reactive } from 'vue';
import { $, isMobile } from "../utils/util";
import styleMobile from "../style/app-mobile-style";
import style from "../style/app-style";
import clickOutside from "../directives/clickoutside";
interface LangType { label: string, value: string }
interface StateType {
    langList: Array<LangType>;
    styleContainer: HTMLStyleElement | null;
    currentLang: string,
    isShowMenu: boolean,
    showPanel: boolean,
}
const emit = defineEmits(["on-change"]);
const state = reactive<StateType>({
    langList: [
        {
            value: "en",
            label: "英语"
        },
        {
            value: "zh",
            label: "汉语"
        },
        {
            value: "jp",
            label: "日语"
        },
        {
            value: "kor",
            label: "韩语"
        },
        {
            value: "fra",
            label: "法语"
        },
        {
            value: "ru",
            label: "俄语"
        },
        {
            value: "de",
            label: "德语"
        }
    ],
    currentLang: "en",
    isShowMenu: false,
    showPanel: true,
    styleContainer: null
});
const getCurrentLabel = computed(() => {
    const find = state.langList.find(i => i.value === state.currentLang);
    return find && find.label;
});
const isLoadMobile = () => (document.body.clientWidth || document.documentElement.clientWidth) > 1132;
const createStyle = () => {
    const el = document.createElement("style");
    el.id = "appStyle";
    if (!$("#appStyle")) {
        ($("head") as HTMLHeadElement).appendChild(el);
    }
    state.styleContainer = el;
}
const onChangeHandler = (item: LangType) => {
    state.currentLang = item.value;
    emit("on-change", item.value);
};
const onResizeHandler = () => {
    state.isShowMenu = !!isMobile() || !isLoadMobile();
    state.showPanel = !isMobile() || isLoadMobile();
    if (state.styleContainer) {
        state.styleContainer.innerHTML = isMobile() || !isLoadMobile() ? styleMobile : style;
    }
}
const onClickOutside = () => {
    // eslint-disable-next-line no-console
    if (!!isMobile() || !isLoadMobile()) {
        state.showPanel = false;
    }
}
const vClickOutside = clickOutside;
onMounted(() => {
    createStyle();
    onResizeHandler();
    window.addEventListener("resize", onResizeHandler);
})
</script>
<template>
    <header class="vt-header">
        <span class="vt-title">当前翻译语言类型:</span>
        <span class="vt-result">{{ getCurrentLabel }}</span>
        <div class="vt-lang-panel-container" v-click-outside="onClickOutside">
            <i class="vt-iconfont vt-menu vt-more" v-show="state.isShowMenu" @click="state.showPanel = !state.showPanel"></i>
            <Transition name="vt-fade">
                <ul class="vt-lang-panel" v-if="state.showPanel">
                    <li 
                        class="vt-li" 
                        v-for="(item, index) in state.langList" 
                        :key="item.value + index"
                        :class="{ 'checked': (state.currentLang === item.value) }" 
                        @click="onChangeHandler(item)"
                    >{{ item.label }}</li>
                </ul>
            </Transition>
        </div>
    </header>
</template>
<style lang="scss" scoped>
.#{$baseSelector}fade-enter-active,
.#{$baseSelector}fade-leave-active {
    transition: opacity .5s;
}

.#{$baseSelector}fade-enter,
.#{$baseSelector}fade-leave-to {
    opacity: 0;
}
</style>