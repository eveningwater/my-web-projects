<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { h, defineAsyncComponent, ref, render } from 'vue';
import { pageInfo } from "./utils/const";
import type { PageInfoType } from "./utils/const";
const AsyncTitle = defineAsyncComponent(() => import("./components/Title.vue"));
const AsyncTab = defineAsyncComponent(() => import("./components/Tab.vue"));
const AsyncHeart = defineAsyncComponent(() => import("./components/Heart.vue"));
const lang = ref("en");
const count = ref(0);
const onTabClickHandler = (v:string) => lang.value = v;
const createHeart = (e:MouseEvent) => {
    const { clientX,clientY,target } = e;
    const { offsetLeft,offsetTop } = target as HTMLElement;
    const heartStyle = {
        left:clientX - offsetLeft + "px",
        top:clientY - offsetTop + "px"
    }
    count.value++;
    const container = document.querySelector("#dch-love") as HTMLDivElement;
    const node = h(AsyncHeart,{ class:"grow",style:heartStyle })
    render(node,container);
    setTimeout(() => {
       render(null,container);
    },2000);
}
let clickTime = 0;
const onLoveHandler = (e:MouseEvent) => {
    if(clickTime === 0){
        clickTime = Date.now();
    }else{
        if(Date.now() - clickTime < 400){
            createHeart(e);
            clickTime = 0;
        }else{
            clickTime = Date.now();
        }
    } 
}
</script>

<template>
    <async-tab @on-tab-click="onTabClickHandler"></async-tab>
    <async-title level="3" class="dch-title">
        {{ pageInfo[lang as keyof PageInfoType].titleStart }}
        <async-heart class="scale"></async-heart>
        {{ pageInfo[lang as keyof PageInfoType].titleEnd }}
    </async-title>
    <small class="dch-count-container">
        {{ pageInfo[lang as keyof PageInfoType].countStart }}
        <span class="dch-count">{{ count }}</span>
        {{ pageInfo[lang as keyof PageInfoType].countEnd }}
    </small>
    <div class="dch-love" id="dch-love" @click="onLoveHandler"></div>
    <button type="button" class="dch-btn" @click="onLoveHandler">{{ pageInfo[lang as keyof PageInfoType].btnText }}</button>
</template>

<style lang="scss">
@import "./style/app.scss";
</style>
