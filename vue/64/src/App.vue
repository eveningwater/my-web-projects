<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent } from 'vue';
const asyncContainer = defineAsyncComponent(() => import('@/components/Container.vue'))
</script>

<template>
    <async-container></async-container>
</template>

<style lang="scss">
$appBgColor:linear-gradient(135deg,#1e475c 10%,#030c44 90%);
* {
    @include setProperty(padding, 0);
    @include setProperty(margin, 0);
    @include setProperty(box-sizing, border-box);
}

.app {
    @include setProperty(height,100vh);
    @include setProperty(display,flex);
    @include setProperty(justify-content,center);
    @include setProperty(align-items,center);
    @include setProperty(overflow,hidden);
    @include setProperty(padding,1em);
    @include setProperty(background,$appBgColor);
}
</style>
