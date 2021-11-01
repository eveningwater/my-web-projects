<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent, watch } from '@vue/runtime-core';
import { computed, ref } from 'vue';
type ListType = Array<{text?:string,isActive?:boolean}>;
const PickerTitle = defineAsyncComponent(() => import("./components/Title"));
const PickerTextArea = defineAsyncComponent(() => import("./components/textarea.vue"));
const choice = ref("");
const choices =ref<ListType>([]);
const changeChoices = (v:string) => v.split(choice.value.indexOf(",") > -1 ? "," : "").filter(v => v.trim()).map(v => ({ text:v,isActive:false }));
const computedChoices = computed<ListType>({
   get(){
      return choices.value;
   },
   set(newValue){
      if(newValue !== choices.value){
          choices.value = newValue;
      }
   }
});
watch(() => choice.value,(val:string) => {
    if(val){
      choices.value = changeChoices(val);
    }
})
const randomChoices = () => Math.floor(Math.random() * choices.value.length);
let timer:any = null,interval = 50;
const onKeyDownHandler = () => {
    const randomHighLight = () => {
      const randomIndex = randomChoices();
      computedChoices.value[randomIndex].isActive = true;
      timer = setTimeout(randomHighLight,interval);
      setTimeout(() => {
          computedChoices.value[randomIndex].isActive = false;
      },interval * 2);
    }
    setTimeout(() => {
       clearTimeout(timer);
       setTimeout(() => {
          const randomIndex = randomChoices();
          computedChoices.value[randomIndex].isActive = true;
       },interval * 2)
    },interval * 100)
    randomHighLight();
}
</script>

<template>
    <picker-title class="rcp-title">
      Enter all of the choices divided by a comma (','),if there is no comma (','), they will be separated by space,Press enter when you're done
    </picker-title>
    <picker-text-area placeholder="enter some choices here" v-model:value="choice" @on-down="onKeyDownHandler"></picker-text-area>
    <div class="rcp-tag-container">
        <span v-for="(tag,index) in computedChoices" :key="tag.toString() + index" class="rcp-tag" :class="{active:tag.isActive}">{{ tag.text }}</span>
    </div>
</template>

<style lang="less">
@import "./style/variable.less";
body {
  .m(n,0,px);
  .app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      .flex-center();
      height: unit(pow(10,2),vh);
      .p(n,20,px);
      background: linear-gradient(@rotate,@bgColor-1 percentage(floor(0.18)),@bgColor-2 percentage(ceil(0.88)));
      .@{baseSelector}title {
         .m(n,0,px);
         color:@color;
         .m(b,15,px);
         max-width: unit(pow(10,2) * (pow(4,3) - pow(4,1)) * 0.1,px);
         line-height: pi() - @full - @full + .2;
         font-size: unit(pow(5,2) - @full,px);
      }
      .@{baseSelector}tag-container {
         max-width: unit(pow(10,2) * (pow(4,3) - pow(4,1)) * 0.1,px);
         .m(t,1,rem);
         .@{baseSelector}tag {
           display: extract(@display,round(3.3));
           .p(t,8,px);
           .p(b,8,px);
           .p(l,20,px);
           .p(r,20,px);
           .m(n,8,px);
           color:@color;
           border-radius: unit(pow(2,3),px);
           background: linear-gradient(@rotate,@tagBgColor-1 percentage(floor(0.18)),@tagBgColor-2 percentage(ceil(0.88)));
           &.active {
             background: linear-gradient(@rotate,@randomBgColor-1 percentage(floor(0.18)),@randomBgColor-2 percentage(ceil(0.88)));
           }
         }
      }
  }
}
</style>
