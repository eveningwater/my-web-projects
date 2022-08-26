<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent } from 'vue';
const AsyncIndex = defineAsyncComponent(() => import("./views/index.vue"));
</script>

<template>
    <async-index></async-index>
</template>

<style lang="scss">
$appBgColor: linear-gradient(135deg,#c4f37a 10%,#11ee66 90%);
* {
    @include setProperty(box-sizing,border-box);
    @include setProperty(margin,0);
    @include setProperty(padding,0);
}
.app {
    @include setProperty(height,100vh);
    @include setProperty(background,$appBgColor);
    @include setProperty(overflow,hidden);
    @extend .flex-center;
}
</style>
