<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { computed, reactive } from "@vue/reactivity";
import Step from "./components/Step.vue";
import StepItem from "./components/StepItem.vue";
const state = reactive({
   stepList:[
      { value:"活动未开始"},
      { value:"活动已开始"},
      { value:"活动进行中"},
      { value:"活动已结束"},
   ],
   current:0
});
const pWidth = computed(() => Math.floor(100 / 3) * state.current);
const onClickHandler = (value:string) => {
   alert("请查看浏览器控制台以查看你选中的值!")
   const consoleText = "你选择的是:" + value;
   console.log("%c " + consoleText,"background:#0ca6dc;padding:4px 10px;border-radius:3px;color:#fff");
}
const onNextHandler = () => {
   if(state.current > state.stepList.length - 1){
      return;
   }
   state.current++;
}
const onPrevHandler = () => {
   if(state.current <= 0){
     return;
   }
   state.current--;
}
</script>

<template>
   <step :progressWidth="pWidth">
     <step-item 
        v-for="(item,index) in state.stepList" 
        :key="item.value + index"
        :class="{ active:state.current >= index }"
        @on-click="onClickHandler(item.value)"
      >{{ item.value }}</step-item>
   </step>
   <div>
      <button class="ps-btn ps-btn-primary" :disabled="state.current === 0" @click="onPrevHandler">上一步</button>
      <button class="ps-btn ps-btn-primary" :disabled="state.current === state.stepList.length - 1" @click="onNextHandler">下一步</button>
   </div>
</template>

<style lang="less">
@import "./style/variable.less";
.base-flex {
   display: flex;
  justify-content: center;
  align-items: center;
}
body {
  margin: 0;
  height: 100%;
  width: 100%;
  .app {
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .base-flex;
    height: 100vh;
    flex-direction: column;
    .ps-btn {
      display: inline-block;
      border: none;
      &::focus-visible {
        outline: none;
      }
      padding: 10px 12px;
      color: @default_color;
      border-radius: 8px;
      letter-spacing: 2px;
      font-size: 14px;
      background-color: @color_active;
      cursor: pointer;
      transition: all .4s cubic-bezier(0.075, 0.82, 0.165, 1);
      margin: 0 1rem;
      &[disabled] {
         background-color: @color;
         color: @font_color;
         cursor: not-allowed;
      }
      &:active {
         transform: scale(.8);
      }
    }
  }
}
</style>
