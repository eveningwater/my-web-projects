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
* {
    @extend .reset;
    @include setProperty(scroll-behavior, smooth);
}
body {
    @include setProperty(overflow,hidden);
    @include setProperty(overflow-y,auto);
    @include setProperty(background,$bodyBgColor);
}
</style>
