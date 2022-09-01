<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent } from 'vue';

const AsyncIndex = defineAsyncComponent(() => import("@/views/index.vue"));
</script>

<template>
  <async-index></async-index>
</template>

<style lang="scss">
$bodyBgColor: linear-gradient(135deg, #94f377 10%, #34f153 90%);

* {
  @extend .reset;
  @include setProperty(font-family,"Press Start 2P",sans-serif);
}

body {
  @include setProperty(overflow, hidden);
  @include setProperty(min-height, 100vh);
  @include setProperty(background,$bodyBgColor);
}

.app {
  @include setProperty(color, $white);
}
</style>
