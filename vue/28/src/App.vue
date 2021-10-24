<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted, onUnmounted, Ref, ref } from 'vue';
import Background from './components/Background.vue';
import Text from './components/Text.vue';
import { scale } from './utils/util';
const count = ref(0);
const timer:Ref<any> = ref(null);
const blurValue = ref(20);
const numberValue = ref(1);
const runLoad = () => {
   count.value++;
   blurValue.value = scale(count.value, 0, 100, 20, 0);
   numberValue.value = scale(count.value, 0, 100, 1, 0);
   if(count.value > 99){
      clearTimeout(timer.value);
   }
   timer.value = setTimeout(runLoad,20);
}
onMounted(() => {
    runLoad();
});
onUnmounted(() => {
   clearTimeout(timer.value)
})
</script>

<template>
    <Background :blur-value="blurValue"></Background>
    <Text :number="numberValue" :count="count"></Text>
</template>

<style lang="less">
body {
  margin: 0;
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
