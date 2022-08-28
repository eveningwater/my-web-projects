<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent } from 'vue';
const AsyncIndex = defineAsyncComponent(() => import('./views/index.vue'))
</script>

<template>
  <async-index></async-index>
</template>

<style lang="scss">
$bodyBgColor:linear-gradient(135deg,#fdcdad 10%,#f5aa47 90%);
$scrollBgColor:linear-gradient(135deg,#f3eeea 10%,#f7e4cc 90%);
$scrollThumbBgColor:linear-gradient(135deg,#f8ac79 10%,#c47004 90%);
* {
    @extend .reset;
    @include setProperty(scroll-behavior, smooth);
}
body {
    @include setProperty(overflow,hidden);
    @include setProperty(overflow-y,auto);
    @include setProperty(background,$bodyBgColor);
}
::-webkit-scrollbar {
    @include setProperty(width,5px);
    @include setProperty(height,5px);
    @include setProperty(background,$scrollBgColor);
}
::-webkit-scrollbar-thumb {
  @include setProperty(width,5px);
    @include setProperty(height,5px);
    @include setProperty(background,$scrollThumbBgColor);
}
</style>
