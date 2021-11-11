<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent, watch } from '@vue/runtime-core';
import { computed, ref } from 'vue';
import { projectNameList,projectNameENList } from './utils/projectNameList';
const AsyncSelect = defineAsyncComponent(() => import("./components/Select.vue"));
const AsyncOption = defineAsyncComponent(() => import("./components/Option.vue"));
const AsyncCard = defineAsyncComponent(() => import("./components/Card.vue"));
interface DataType {
    name:string;
    href:string;
    source:string;
}
const typeList = [
   {
     label:"javascript",
     value:"javascript"
   },
   {
     label:"react",
     value:"react"
   },
   {
     label:"vue",
     value:"vue"
   }
];
const webProjectType = ref("javascript");
const lang = ref("en");
const dataList = ref<Array<DataType>>([]);
const getNameList = (arr:Array<string>) => arr.slice(0,23).concat(arr.slice(-1)).concat(arr.slice(23,-1));
const createDataList = (start:number,directory:string,maxNumber:number) => {
    dataList.value = [];
    for(let i = 0;i < maxNumber;i++){
       let href = directory + "/" + (start + i);
       if(directory === "js" && (start + i) > 103 && i < 49){
          href = directory + "/" + (start + i + 1);
       }else if(directory === "js" && i === 49){
          href = "CSS/6"; 
       }
       let name = lang.value === "en" ? projectNameENList[i] : projectNameList[i];
       if(directory !== "js") {
          name = lang.value === "en" ? getNameList(projectNameENList)[i] : getNameList(projectNameList)[i];
       }
       dataList.value.push({
          name,
          href,
          source:(i + 1) + ".png"
       })
    }
}
const newDataList = computed(() => dataList.value);
const directory = computed(() => webProjectType.value);
watch(() => webProjectType.value,(val) => {
   switch(val){
      case "javascript":{
         createDataList(59,"js",50);
         break;
      }
      case "react":{
         createDataList(6,val,50);
         break;
      }
      case "vue":{
         createDataList(24,val,15);
         break;
      }
   }
});
createDataList(59,"js",50);
</script>

<template>
    <div class="mini-web-container">
        <header class="mini-web-header">
            <p class="mini-web-header-title">The 50 mini web project</p>
            <async-select class="mini-web-header-select" v-model="webProjectType">
               <async-option v-for="(type,index) in typeList" :key="type.value + index" :value="type.value" :label="type.label">{{ type.label }}</async-option>
            </async-select>
        </header>
        <main class="mini-web-main">
            <async-card 
              v-for="(card,index) in newDataList" 
              :key="card.name + index"
              :cardSourceURL="card.source" 
              :href="card.href"
              :directory="directory" 
              :cardName="card.name" 
            ></async-card>
        </main>
    </div>
</template>

<style lang="less">
@import "./style/common.less";
@import "./style/variable.less";
body {
  .m(n,0,px);
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .@{baseSelector}container{
        width: percentage(@full);
        .p(n,10,px);
        min-height: unit(pow(10,2),vh);
        box-sizing: border-box;
        background: linear-gradient(@rotate,fade(@bgColor-1,40%) percentage(@full * .1),fadeout(@bgColor-2,70%) percentage(@full - .1)),
                    linear-gradient(@rotate,fade(@bgColor-1,50%) percentage(@full * .1),fadeout(@bgColor-2,80%) percentage(@full - .1)),
                    linear-gradient(@rotate,fade(@bgColor-1,60%) percentage(@full * .1),fadeout(@bgColor-2,90%) percentage(@full - .1));
        .@{baseSelector}header {
          .flex-center();
          height: unit(pow(8,2) - pow(2,2),px);
          color:@color;
          .@{baseSelector}header-select {
              width: unit(pow(10,2) * 2,px);
              .m(l,15,px);
              .m(t,10,px);
          }
          .@{baseSelector}header-title {
             .m(n,@none,px);
             .m(t,10,px);
          }
        }
        @media (max-width: 560px) {
            .@{baseSelector}header {
              flex-direction: column;
              height: unit(pow(10,2),px);
              .@{baseSelector}header-title {
                .m(n,@none,px);
              }
            }
        }
        .@{baseSelector}main {
           width: percentage(@full);
           display: extract(@display,@full + @full);
           justify-content: extract(@align,@full + @full);
           flex-wrap: wrap;
           .m(t,10,px);
        }
    }
  }
}
</style>
