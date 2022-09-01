<script setup lang="ts">
import { defineAsyncComponent, ref, watch } from 'vue';
import { globalData, GlobalDataKey } from '../utils/const';

const AsyncTab = defineAsyncComponent(() => import("@/components/Tab.vue"));
const AsyncFirstScreen = defineAsyncComponent(() => import('./FirstScreen.vue'));
const AsyncSecondScreen = defineAsyncComponent(() => import('./SecondScreen.vue'));
const AsyncThirdScreen = defineAsyncComponent(() => import('./ThirdScreen.vue'));

const currentLang = ref<GlobalDataKey>("en");
const currentSelectInsect = ref('');
const isRefresh = ref(true);
const firstScreenRef = ref<{ toggleScreen: (v: boolean) => void } | null>(null);
const secondScreenRef = ref<{ toggleScreen: (v: boolean) => void } | null>(null);
const thirdScreenRef = ref<{ startGame: () => void, createInsect: () => void} | null>(null);
const onSelectHandler = (v: string) => {
    currentSelectInsect.value = v;
    thirdScreenRef.value?.createInsect();
    thirdScreenRef.value?.startGame();
}
const onRestartHandler = () => {
    currentSelectInsect.value = '';
    firstScreenRef.value?.toggleScreen(false);
    secondScreenRef.value?.toggleScreen(false);
    isRefresh.value = false;
    setTimeout(() => {
        isRefresh.value = true;
    })
}
watch(() => currentLang.value,(val:GlobalDataKey) => {
    document.title = globalData[val].documentTitle;
},{ immediate:true })
</script>
<template>
    <async-first-screen :lang="currentLang" ref="firstScreenRef"></async-first-screen>
    <async-second-screen :lang="currentLang" @on-select="onSelectHandler" ref="secondScreenRef"></async-second-screen>
    <async-third-screen :lang="currentLang" :insect="currentSelectInsect" @on-restart="onRestartHandler"
        ref="thirdScreenRef" v-if="isRefresh"></async-third-screen>
    <async-tab v-model="currentLang"></async-tab>
</template>
<style lang="scss" scoped>
</style>