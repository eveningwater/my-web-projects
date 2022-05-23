<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent, onMounted } from 'vue';
import { Toast } from "./components/toastFactory";
const asyncTitle = defineAsyncComponent(() => import("./components/Title.vue"));
const messages = [
    "消息内容1",
    "消息内容2",
    "消息内容3",
    "消息内容4",
    "消息内容5"
];
const types = ["success","info","error","default","warning"];
const getRandom = <T>(data:Array<T>) => data[Math.floor(Math.random() * data.length)];
const randomRange = (min:number,max:number):number => Math.floor(Math.random() * (max - min + 1)) + min;
const maxWidth = window.innerWidth - 250,maxHeight = window.innerHeight - 60;
const leftPositions:Array<number> = [],topPositions:Array<number> = [];
for(let i = 0;i < 20;i++){
    leftPositions.push(randomRange(0,maxWidth));
    topPositions.push(randomRange(0,maxHeight));
}
const onCreateToast = (type:string) => {
    const randomType = getRandom(types);
    const randomMessage = getRandom(messages);
    const left = getRandom(leftPositions);
    const top = getRandom(topPositions);
    const option = {
        message:randomMessage,
        type:randomType,
        left,
        top
    };
    const typeOption = type === "auto" ? { closeTime:200 } : { closeTime:0,showClose:true };
    Toast({ ...option,...typeOption });
}
</script>

<template>
    <div class="tn-header">
        <button type="button" class="tn-header-btn" @click="onCreateToast('auto')">show Notification(auto close)</button>
        <async-title level="2" class="tn-header-title">Notification</async-title>
        <button type="button" class="tn-header-btn" @click="onCreateToast('notAuto')">show Notification(not auto close)</button>
    </div>
    <div class="tn-toast-container" id="tn-toast-container"></div>
</template>

<style lang="scss">
    @import "./style/app.scss";
</style>
