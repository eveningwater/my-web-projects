<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent, onMounted } from '@vue/runtime-core';
import { reactive } from 'vue';
const AsyncKeyCode = defineAsyncComponent(() => import("./components/keyCode.vue"));
const state = reactive({
    keyCodeArr:[
       { title:"event.key",content:"" },
       { title:"event.keyCode",content:"" },
       { title:"event.code",content:"" },
    ],
    isDefaultKey:false
});
const onKeyDownHandler = (e:KeyboardEvent) => {
    const { key,code,keyCode } = e;
    state.keyCodeArr[0].content = key === " " ? "Space" : key;
    state.keyCodeArr[1].content = code;
    state.keyCodeArr[2].content = keyCode + "";
    state.isDefaultKey = true;
}
onMounted(() => {
    window.addEventListener("keydown",onKeyDownHandler);
})
</script>

<template>
    <template v-if="state.isDefaultKey">
        <async-key-code v-for="(key,index) in state.keyCodeArr" :key="key.title + index">
            <small class="kc-title">{{ key.title }}</small>
            {{ key.content }}
        </async-key-code>
    </template>
    <template v-else>
        <async-key-code></async-key-code>
    </template>
</template>

<style lang="less">
@import "./style/variable.less";
body {
  margin:@none;
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: unit(pow(10,2),vh);
    background: linear-gradient(@rotate,@appBgColor-1 percentage(pow(.1,1)),@appBgColor-2 percentage(pow(3,2) * 0.1));
    overflow: extract(@overflow,@full);
    &:extend(.flex-center);
    .@{baseSelector}title {
        position: extract(@position,@full);
        left: percentage(@half);
        transform: translateX(percentage(-@half));
        color:@fontColor;
        top: unit(-(pow(3,3) + pow(3,2)),px);
        font-size: unit(pow(4,2) + pow(2,3),px);
        .mb-(8);
    }
  }
}
</style>
