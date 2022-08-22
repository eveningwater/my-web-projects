<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent } from 'vue';
const AsyncContainer = defineAsyncComponent(() => import("@/components/Container.vue"))
</script>

<template>
  <async-container></async-container>
</template>

<style lang="scss">
$appBgColor: linear-gradient(135deg,#d55bf3 10%,#a919d4 90%);
$scrollBtnBgColor: linear-gradient(135deg,#e9c0f3 10%,#dc7bfa 90%);
::-webkit-scrollbar {
   @include setProperty(width,5px);
   @include setProperty(height,5px);
   @include setProperty(background,$appBgColor);
}
::-webkit-scrollbar-thumb {
   @include setProperty(width,5px);
   @include setProperty(height,5px);
   @include setProperty(background,$scrollBtnBgColor);
}
* {
  @include setProperty(margin, 0);
  @include setProperty(padding, 0);
  @include setProperty(box-sizing, border-box);
}
.app {
  @include setProperty(display,flex);
  @include setProperty(justify-content,center);
  @include setProperty(align-items,center);
  @include setProperty(height,100vh);
  @include setProperty(background,$appBgColor);
  @include setProperty(overflow,hidden);
}
</style>
