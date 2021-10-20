<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { ref } from '@vue/reactivity';
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const imageURL = "https://www.eveningwater.com/my-web-projects/js/26/img/";
const imageItems = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg'
];
const currentIndex = ref(0);
</script>

<template>
   <div class="ec-panel" 
      v-for="(item,index) in imageItems" 
      :key="index + item" 
      :class="index === currentIndex ? 'active' : ''"
      :style="{ backgroundImage:`url(${ imageURL + item })`}"
      @click="currentIndex = index"
   >girl{{ item.slice(0,1)}}</div>
</template>

<style lang="less">
.base-flex {
   display: flex;
  justify-content: center;
  align-items: center;
}
body {
  margin: 0;
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg,#b5d5ee 10%,#4096ef 90%);
  .base-flex;
  .app {
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 90vw;
    .base-flex;
    .ec-panel {
        .base-flex;
        color: #fff;
        margin: 10px;
        padding: 10px;
        font-size: 1.2rem;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        border-radius: 20px;
        position: relative;
        height: 90vh;
        flex: 0.5 1;
        cursor: pointer;
        transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
        &.active {
          flex: 5 1;
        }
    }
  }
}
</style>
