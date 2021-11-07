<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent, onMounted, onUnmounted } from '@vue/runtime-core';
import { reactive } from 'vue';
const AsyncCounter = defineAsyncComponent(() => import("./components/Counter.vue"));
const state = reactive({
  counterList:[
      {
        class: "fa-youtube",
        value: 5000,
        initValue: 0,
        text: "YouTube Subscribers",
        timer: 0
      },
      {
        class: "fa-facebook",
        value: 7500,
        initValue: 0,
        text: "Facebook Fans",
        timer: 0
      },
      {
        class: "fa-twitter",
        value: 12000,
        initValue: 0,
        text: "Twitter Followers",
        timer: 0
      }
  ]
})
const startCounter = () => {
  //  for(let i = 0,l = state.counterList.length;i < l;i++){
  //     const counter = state.counterList[i];
  //     const updateCounter = () => {
  //           const value = counter.value;
  //           const increament = value / 100;
  //           if(counter.initValue < value){
  //               counter.initValue += increament;
  //               counter.timer = setTimeout(updateCounter,60);
  //           }else{
  //             counter.initValue = value;
  //             clearTimeout(counter.timer);
  //           }
  //     }
  //     updateCounter();
  //  }
  state.counterList.forEach(counter => {
     const updateCounter = () => {
            const value = counter.value;
            const increament = value / 100;
            if(counter.initValue < value){
                counter.initValue += increament;
                counter.timer = setTimeout(updateCounter,60);
            }else{
              counter.initValue = value;
              clearTimeout(counter.timer);
            }
      }
      updateCounter();
  })
}
onMounted(() => {
    startCounter();
});
onUnmounted(() => {
  
})
</script>

<template>
    <async-counter 
      v-for="(counter,index) in state.counterList" 
      :key="counter.text + index" 
      :icon-class="counter.class"
      :text="counter.text"
      :value="counter.initValue"
    ></async-counter>
</template>

<style lang="scss">
@import "./style/variable.scss";
body {
  @include margin-reset;
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @include flex-center;
    flex-wrap: wrap;
    overflow: hidden;
    background: linear-gradient(135deg,$appBgColor-1 10%,$appBgColor-2 90%);
    height: 100vh;
  }
}
</style>
