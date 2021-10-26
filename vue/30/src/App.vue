<script setup lang="ts">
import { reactive } from '@vue/reactivity';
import Title from './components/Title.vue';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const BASE_URL = "https://eveningwater.com/my-web-projects/js/65/images/";
const splitList = [
   {
      text:"Shirahoshi",
      type:"left",
      href:"https://baike.baidu.com/item/%E7%99%BD%E6%98%9F/34180?fromtitle=%E7%99%BD%E6%98%9F%E5%85%AC%E4%B8%BB&fromid=4377673&fr=aladdin"
   },
   {
     text:"Zanilia",
     type:"right",
     href:"https://baike.baidu.com/item/%E8%B5%B5%E4%B8%BD%E9%A2%96/10075976?fr=aladdin"
   }
]
const state = reactive({

})
</script>

<template>
    <div class="sp-panel" v-for="(item,index) in splitList" :key="item.type + index" :class="`sp-${item.type}-panel`">
       <Title class="sp-title" level="3">the {{ item.type }} panel</Title>
       <a :href="item.href" target="_blank" rel="noopener noreferrer">{{ item.text }}</a>
    </div>
</template>

<style lang="less">
body {
  margin: 0;
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: unit(100,vh);
    .sp-panel {

    }
  }
}
</style>
