<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent } from 'vue';
const AsyncPanel = defineAsyncComponent(() => import('@/components/Panel.vue'))
</script>

<template>
  <async-panel></async-panel>
</template>

<style lang="scss">
$appBgColor: linear-gradient(135deg, #eccc63 10%, #e7900d 90%);

* {
  @include setProperty(box-sizing, border-box);
  @include setProperty(margin, 0);
  @include setProperty(padding, 0);
}

.app {
  @extend .flex-center;
  @include setProperty(background, $appBgColor);
  @include setProperty(height, 100vh);
  @include setProperty(overflow, hidden);
}
</style>
