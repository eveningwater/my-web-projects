<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue';
const AsyncInputNumber = defineAsyncComponent(() => import("./components/InputNumber.vue"));
const TIME = 300,
      TEXT = "我爱程序，程序使我快乐!";
const char = ref(""),
      speed = ref(1);
let timer:number | null = null,charIndex = 0;
const onWriteChar = () => {
    char.value = TEXT.slice(0,charIndex);
    charIndex++;
    if(charIndex >= TEXT.length){
      charIndex = 1;
    }
    timer = window.setTimeout(onWriteChar, TIME / speed.value);
}
onMounted(() => {
    onWriteChar();
});
onUnmounted(() => {
    if(timer){
        clearTimeout(timer);
    }
})
</script>

<template>
    <div class="ate-text">{{ char }}</div>
    <async-input-number v-model="speed"></async-input-number>
</template>

<style lang="scss">
@import "./style/app.scss";
</style>
