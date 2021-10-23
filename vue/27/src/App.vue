<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import hswInput from './components/hsw-input.vue';
</script>

<template>
    <hsw-input></hsw-input>
</template>

<style lang="less">
@import "./style/variable.less";
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg,@body_bg_color_1 10%,@body_bg_color_2 90%);
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
}
</style>
