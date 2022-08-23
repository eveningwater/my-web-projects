<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent } from 'vue';
const AsyncTitle = defineAsyncComponent(() => import('@/components/Title.vue'));
const AsyncCustomInput = defineAsyncComponent(() => import('@/components/CustomInput.vue'));
</script>

<template>
  <async-title class="crs-title">custom-range-slider</async-title>
  <async-custom-input></async-custom-input>
</template>

<style lang="scss">
$appBgColor:linear-gradient(135deg,#4185c9 10%,#1a6eeb 90%);
$titleColor: #fdfdfd;
* {
  @include setProperty(margin,0);
  @include setProperty(padding,0);
  @include setProperty(box-sizing,border-box);
}
.app {
   @include setProperty(height,100vh);
   @include setProperty(overflow,hidden);
   @include setProperty(background,$appBgColor);
   @extend .flex-center;
   .#{$prefix}title {
      @include setProperty(position,absolute);
      @include setProperty(top,20px);
      @include setProperty(color,$titleColor);
      @include setProperty(letter-spacing,2px);
      @include setProperty(font-size,1.5rem);
   }
}
</style>
