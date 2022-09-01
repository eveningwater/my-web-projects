<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted, watch } from '@vue/runtime-core';
import { computed, ref } from 'vue';
import { githubURL } from './utils/const';
import { projectNameList,projectNameENList } from './utils/projectNameList';
import { AsyncSelect,AsyncOption,AsyncCard,AsyncLinkIcon,AsyncTab,AsyncTitle,AsyncBackTop,AsyncFooter } from "./app";
interface DataType {
    name:string;
    href:string;
    source:string;
}
interface TitleType {
    [key:string]:any;
    en:string;
    zh:string;
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
const TitleData:TitleType = {
   "en":"The 50 mini web project",
   "zh":"50个迷你的web项目"
}
// ref
const webProjectType = ref("javascript");
const lang = ref("en");
const dataList = ref<Array<DataType>>([]);
// computed
const newDataList = computed(() => dataList.value);
const directory = computed(() => webProjectType.value);
// watch
watch(() => webProjectType.value,(val) => loadDataHandler(val));
// function and event
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
const loadDataHandler = (val:string) => {
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
         createDataList(24,val,50);
         break;
      }
   }
}
const changeDocumentTitle = () => document.title = TitleData[lang.value];
const onTabClick = (val:string) => {
   lang.value = val;
   loadDataHandler(webProjectType.value);
   changeDocumentTitle();
}
createDataList(59,"js",50);

onMounted(() => {
   changeDocumentTitle();
})
</script>

<template>
    <div class="mini-web-container">
        <div class="mini-web-tool">
           <async-tab @on-tab-click="onTabClick"></async-tab>
           <async-title class="mini-web-header-title">{{ TitleData[lang] }}</async-title>
           <a :href="githubURL" target="_blank" rel="noopener noreferrer" class="mini-web-github-link">
              <async-link-icon type="githubDProp" :width="38" :height="38"></async-link-icon>
            </a>
        </div>
        <main class="mini-web-main">
           <header class="mini-web-header">
               {{ lang === "en" ? "Please choose the classification!" : "请选择分类!" }}
               <async-select class="mini-web-header-select" v-model="webProjectType">
                  <async-option v-for="(type,index) in typeList" :key="type.value + index" :value="type.value" :label="type.label">{{ type.label }}</async-option>
               </async-select>
            </header>
            <div class="mini-web-main-content">
               <async-card 
                  v-for="(card,index) in newDataList" 
                  :key="card.name + index"
                  :cardSourceURL="card.source" 
                  :href="card.href"
                  :directory="directory" 
                  :cardName="card.name"
                  :cardIndex="index" 
               ></async-card>
            </div>
            <async-footer :lang="lang"></async-footer>
        </main>
        <async-back-top target=".mini-web-main"></async-back-top>
    </div>
</template>

<style lang="less">
body {
  .m(n,0,px);
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .@{baseSelector}container{
        width: percentage(@full);
        height: unit(pow(10,2),vh);
        box-sizing: border-box;
        background: linear-gradient(@rotate,fade(@bgColor-1,40%) percentage(@full * .1),fadeout(@bgColor-2,70%) percentage(@full - .1)),
                    linear-gradient(@rotate,fade(@bgColor-1,50%) percentage(@full * .1),fadeout(@bgColor-2,80%) percentage(@full - .1)),
                    linear-gradient(@rotate,fade(@bgColor-1,60%) percentage(@full * .1),fadeout(@bgColor-2,90%) percentage(@full - .1));
        .@{baseSelector}tool {
           height: unit(4,em);
           width: percentage(@full);
           display: extract(@display,@full + @full);
           justify-content: extract(@content,length(@content) - @full);
           align-items: extract(@align,@full + @full);
           box-sizing: border-box;
           border-bottom: unit(@full,px) solid @color;
           .p(n,10,px);
           .@{baseSelector}github-link {
              text-decoration: extract(@display,length(@display));
              &:hover {
                 opacity: 0.76;
              }
           }
           .@{baseSelector}header-title {
             .m(n,@none,px);
             .m(t,10,px);
             .m(b,10,px);
             text-align: extract(@align,@full + @full);
             color:@color;
          }
        }
        .@{baseSelector}header {
          .flex-center();
          height: unit(pow(8,2) - pow(2,2),px);
          color:@color;
          .@{baseSelector}header-select {
              width: unit(pow(10,2) * 2,px);
              .m(l,8,px);
          }
        }
        @media (max-width: 560px) {
            .@{baseSelector}header {
              flex-direction: column;
              height: unit(pow(10,2),px);
              .@{baseSelector}header-select {
                  .m(t,8,px);
               }
            }
            .@{baseSelector}tool {
               .@{baseSelector}header-title {
                 font-size: unit(@full,rem);
              }
            }
        }
        .@{baseSelector}main {
           width: percentage(@full);
           height: calc(percentage(@full) - unit(pow(2,2),em));
           box-sizing: border-box;
           .@{baseSelector}main-content {
               display: extract(@display,@full + @full);
               justify-content: extract(@align,@full + @full);
               flex-wrap: wrap;
               .p(n,10,px);
           }
           .m(t,10,px);
           overflow: extract(@overflow,@full + @full);
        }
    }
  }
}
</style>
