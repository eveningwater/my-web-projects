<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent } from '@vue/runtime-core';
const AsyncFormComponent = defineAsyncComponent(() => {
  return import("./components/Form.vue");
})
</script>

<template>
    <div class="fw-container">
       <AsyncFormComponent></AsyncFormComponent>
    </div>
</template>

<style lang="less">
  @import "./style/variable.less";
  @rotate:@full * 100 + 35;
  body,html {
      margin: 0;
      height: percentage(@full);
      .app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        .flex-center();
        overflow: extract(@overflow,@full);
        background: linear-gradient(unit(@rotate,deg),@appBgColor-1 10%,@appBgColor-2 90%);
        height: inherit;
        .fw-container {
          background: linear-gradient(unit(@rotate,deg),@containerBgColor-1 10%,@containerBgColor-2 90%);
          position: extract(@position,length(@position));
          border-radius: unit(@full * 10 + 5,px);
          padding: range(30px,40px,10);
        }
      }
  }
</style>
