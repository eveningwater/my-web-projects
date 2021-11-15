<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent } from '@vue/runtime-core';
const AsyncHeader = defineAsyncComponent(() => import("./components/Header.vue"));
</script>

<template>
    <async-header></async-header>
    <main class="ma-main h-100p">
        <ul class="ma-movie-list"></ul>
    </main>
</template>

<style lang="scss">
@import "./style/variable.scss";
body {
  @include m(null,0,null);
   @extend .overflow-hidden;
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .#{$baseSelector}main {
        @include flex-100p;
        box-sizing: border-box;
        @extend .bgColor;
        @extend .overflow-hidden;
        .#{$baseSelector}movie-list {
           @include flex-100p;
           flex-wrap: wrap;
           @extend .overflow-hidden;
           list-style: none;
           height: calc(100% - 5rem);
           @include p(-top,1,rem);
           @include p(-bottom,1,rem);
           @include p(-left,0,null);
           @include p(-right,0,null);
           position: relative;
           overflow-y: auto;
           box-sizing: border-box;
        }
    }
  }
}
</style>
