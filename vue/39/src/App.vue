<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent, onBeforeMount } from '@vue/runtime-core';
import { computed, reactive, ref, StyleValue } from 'vue';
import { dwData } from './utils/data';
import type { DataType } from './utils/data';
interface StateType {
  remindData:number;
  percent:number;
  cupList:Array<Array<{ num:number,class:string }>>
}
const AsyncTitle = defineAsyncComponent(() => import("./components/Title.vue"));
const AsyncTab = defineAsyncComponent(() => import("./components/Tab.vue"));

const currentLang = ref("en");
const state = reactive<StateType>({
    remindData:2,
    percent:0,
    cupList:[]
});
const data = computed(() => dwData[currentLang.value as keyof DataType]);
const remindStyle = computed(() => ({
    height:(state.remindData / 2 * 350) + 'px',
    visibility:state.remindData <= 0 ? "hidden" : "visible"
})) as StyleValue;
const percentStyle = computed(() => ({
    height:((1 - state.remindData / 2) * 350) + 'px',
    visibility:state.remindData >= 2 ? "hidden" : "visible"
})) as StyleValue;

const onSelectCupHandler = (index:number,cupIndex:number) => {
    // all selected
    if(index === 1 && cupIndex === 3){
        state.cupList.forEach(item => item.forEach(cup => cup.class = "active"));
    }else if(index === 1 && cupIndex < 3){
        state.cupList[index - 1].forEach(cup => cup.class = "active");
        const next = state.cupList[index][cupIndex + 1];
        state.cupList[index].forEach((cup,_index) => {
           if(cupIndex < _index){
              cup.class = "";
           }else if(cupIndex === _index){
              cup.class = next.class ? "active" : cup.class === "" ? "active" : "";
           }else{
              cup.class = "active";
           }
        })
    }else {
        const next = cupIndex === 3 ? state.cupList[index + 1][0] : state.cupList[index][cupIndex + 1];
        state.cupList[index].forEach((cup,_index) => {
            if(_index > cupIndex){
                cup.class = "";
            }else if(cupIndex === _index) {
                cup.class = next.class ? "active" : cup.class === "" ? "active" : "";
            }else{
                cup.class = "active";
            }
        });
        // clear next row
        state.cupList[index + 1].forEach(cup => cup.class = "");
    }
    const activesNum = state.cupList.flat().filter(cup => cup.class).map(cup => cup.num / 1000).reduce((v,cup)=> (v += cup,v),0);
    state.remindData = 2 - activesNum;
    state.percent = activesNum / 2 * 100;
}

onBeforeMount(() => {
    for(let i = 0;i < 2;i++){
       state.cupList[i] = [];
       for(let j = 0;j < 4;j++){
         state.cupList[i].push({
            num:250,
            class:""
         })
       }
    }
})
</script>

<template>
    <async-tab :lang="currentLang" @on-tab-click="(v:string) => currentLang = v"></async-tab>
    <div class="dw-container">
        <async-title level="2" class="dw-title m-0 mt-15 mb-15">{{ data.title }}</async-title>
        <div class="dw-total mb-30">{{ data.total.left }}<span class="ml-5 mr-5">2</span>{{ data.total.right }}</div>
        <div class="dw-class-cup">
            <div class="dw-remind" :style="remindStyle">
                <span v-if="currentLang === 'zh'" class="mb-5">{{ data.class.text }}</span>
                <span class="dw-cup-total"><span class="ml-5 mr-5">{{ state.remindData }}</span>{{ data.class.unit }}</span>
                <span v-if="currentLang === 'en'" class="mt-5">{{ data.class.text }}</span>
            </div>
            <div class="dw-percent" :style="percentStyle">{{ state.percent }}%</div>
        </div>
        <p class="dw-content mt-15 mb-15">{{ data.text }}</p>
        <div class="dw-select-cup">
            <div class="dw-row m-0 mt-10 mb-10" v-for="(row,index) in state.cupList" :key="row.toString() + index">
                <div 
                  class="dw-cup ml-15 mr-15" 
                  v-for="(cup,cupIndex) in row" 
                  :key="cup.toString() + cupIndex" 
                  :class="cup.class"
                  @click="onSelectCupHandler(index,cupIndex)"
                >{{ cup.num }} {{ data.unit }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "./style/variable.scss";
body {
  @include margin-reset;
  .app {
    font-family:$font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    @extend .bgColor;
    @extend .overflow-hidden;
    color:$color;
    .#{$baseSelector}container {
       @include flex-center;
       @extend .flex-column;
       .#{$baseSelector}total {
          font-size: 20px;
       }
       .#{$baseSelector}class-cup {
          width: 150px;
          height: 350px;
          @extend .base-cup-style;
          @extend .cupBgColor;
          color:$classCupColor;
          @extend .overflow-hidden;
          .#{$baseSelector}remind,.#{$baseSelector}percent {
              @include flex-center;
              @extend .flex-column;
              @extend .base-transition;
              &.#{$baseSelector}percent {
                 @extend .cupBgActiveColor;
                 color:$color;
              }
          }
       }
       .#{$baseSelector}content {
         font-size: 14px;
         letter-spacing: 2px;
       }
       .#{$baseSelector}select-cup {
          .#{$baseSelector}row {
             @include flex-center;
             .#{$baseSelector}cup {
                width: 50px;
                height: 100px;
                @include flex-center;
                @extend .base-cup-style;
                @extend .base-transition;
                user-select: none;
                text-align: center;
                cursor: pointer;
                box-sizing: border-box;
                @extend .cupBgColor;
                color:$classCupColor;
                &.active {
                    @extend .cupBgActiveColor;
                    color:$color;
                }
             }
          }
       }
    }
  }
}
</style>
