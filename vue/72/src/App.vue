<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent } from 'vue';
const AsyncIndex = defineAsyncComponent(() => import('./views/index.vue'));
</script>

<template>
   <async-index></async-index>
</template>

<style lang="scss">
   $appBgColor: linear-gradient(135deg,#fac3b9 10%,#eb8b73 90%);
* {
   @extend .reset;
}
body {
   @include setProperty(overflow,hidden);
   .app {
      @extend .flex-center;
      @include setProperty(height,100vh);
      @include setProperty(overflow,hidden);
      @include setProperty(overflow-y,auto);
      @include setProperty(background,$appBgColor);
      @include setProperty(flex-direction,column);
   }
}
:focus-visible {
   @include setProperty(outline,none);
}
</style>
