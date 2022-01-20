<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
    <div class="ds-slider-container"></div>
</template>

<style lang="scss">
* {
  @include setComponent(margin,0,null);
  @include setComponent(padding,0,null);
  @extend .bs-border-box;
}
body {
  .app {
    font-family:$font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .#{$baseSelector}slider-container {
        @include setComponent(width,100,vw);
        @include setComponent(height,100,vh);
        @extend .el-pos-r,.over-hidden;
    }
  }
}
</style>
