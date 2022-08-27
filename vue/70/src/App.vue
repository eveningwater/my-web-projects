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
$appBgColor: linear-gradient(135deg, #fabb7f 10%, #f17713 90%);

* {
  @extend .reset;
}

.app {
  @include setProperty(height, 100vh);
  @include setProperty(overflow, hidden);
  @include setProperty(background, $appBgColor);
  @extend .flex-center;
}
</style>
