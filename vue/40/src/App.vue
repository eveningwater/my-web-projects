<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent } from '@vue/runtime-core';
const AsyncHeader = defineAsyncComponent(() => import("./components/Header.vue"));
</script>

<template>
    <async-header></async-header>
</template>

<style lang="scss">
@import "./style/variable.scss";
body {
  @include m(null,0,null);
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
