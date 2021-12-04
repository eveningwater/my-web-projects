<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent } from '@vue/runtime-core';
const AsyncColorPicker = defineAsyncComponent(() => import("./components/ColorPicker.vue"));
const AsyncButton = defineAsyncComponent(() => import("./components/Button.vue"));
</script>

<template>
    <div class="da-tool">
        <async-button native-type="button" class="da-decrease">-</async-button>
        <async-color-picker class="da-color-picker"></async-color-picker>
    </div>
    <canvas class="da-board" width="800" height="600"></canvas>
</template>

<style lang="scss">
@import "./style/variable.scss";
body {
  @extend .reset;
  .app {
    font-family: $font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .#{$baseSelector}tool,.#{$baseSelector}board {
        width: percentage(1);
        max-width: $containerWidth;
        @extend .m-auto;
        @extend .el-block;
        &.#{$baseSelector}tool{
           @extend .p-r;
           @extend .tool-bg;
           @extend .el-flex;
           height: 80px;
           @include m("b",8,px);
           @include m("t",8,px);
           @include p(null,20,px);
           box-sizing: border-box;
           .#{$baseSelector}color-picker {
             @extend .el-inline-block;
             @include m("l",3,px);
             @include m("r",3,px);
           }
           .#{$baseSelector}decrease {
              @include m("r",8,px);
           }
        }
        &.#{$baseSelector}board {
            max-height: 700px;
            height: percentage(1);
            border: {
               width:2px;
               style:solid;
               color:$boardBorderColor;
            }
        }
    }
  }
}
</style>
