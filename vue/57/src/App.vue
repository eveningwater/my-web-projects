<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent, ref } from 'vue';
const AsyncNumberGroup = defineAsyncComponent(() => import('@/components/NumGroup.vue'));
const AsyncTitle = defineAsyncComponent(() => import('@/components/title.vue'));
const AsyncButton = defineAsyncComponent(() => import('@/components/Button.vue'));
const counterDisplay = ref("show");
const finalDisplay = ref("hide");
const changeDisplay = (c: string,f: string) => {
  counterDisplay.value = c;
  finalDisplay.value = f;
}
const onAnimationEndHandler = () => {
    changeDisplay("hide","show")
}
const groupContainer = ref<InstanceType<typeof AsyncNumberGroup> | null>(null);
const onReplayHandler = () => {
  changeDisplay("","");
  groupContainer.value?.resetAnimation()
  groupContainer.value?.startRunAnimation()
}
</script>

<template>
  <div class="ac-counter" :class="counterDisplay">
    <AsyncNumberGroup @on-animation-end="onAnimationEndHandler" :count="10" ref="groupContainer"></AsyncNumberGroup>
    <async-title class="ac-title" level="4">ready go</async-title>
  </div>
  <div class="ac-final" :class="finalDisplay">
    <async-title class="ac-title">Go</async-title>
    <async-button type="warning" size="large" @click="onReplayHandler">replay</async-button>
  </div>
</template>

<style lang="scss">
@import "./style/app.scss";
</style>
