<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { reactive, readonly } from '@vue/reactivity';
import { defineAsyncComponent } from '@vue/runtime-core';
const FaqTitle = defineAsyncComponent(() => import("./components/Title"));
const FaqCollapse = defineAsyncComponent(() => import("./components/Faq.vue"));
const state = readonly(reactive({
    faqList: [
        {
            title:"Why shouldn't we trust atoms?",
            text:"They make up everything."
        },
        {
            title:"What do you call someone with no body and no nose?",
            text:"Nobody knows."
        },
        {
            title:"What's the object-oriented way to become wealthy?",
            text:"Inheritance."
        },
        {
            title:"How many tickles does it take to tickle an octopus?",
            text:"Ten-tickles!"
        },
        {
            title:"What is: 1 + 1?",
            text:"Depends on who are you asking."
        }
    ]
}));
const onCollapseHandler = (e:MouseEvent) => {
    const { currentTarget } = e;
    const iconElement = (currentTarget as HTMLElement);
    const isDown = iconElement.classList.contains("fa-chevron-down");
    const matchRule = isDown ? /chevron-down/g : /close/g;
    const updateValue = isDown ? "close" : "chevron-down";
    iconElement.className = iconElement.className.replace(matchRule,updateValue);
    iconElement.parentElement?.classList.toggle("active");
}
</script>

<template>
    <faq-title class="faq-title">Frequently Asked Questions</faq-title>
    <div class="faq-container">
        <faq-collapse v-for="(faq,index) in state.faqList" :key="faq.title + index">
            <faq-title class="faq-collapse-title" level="3">{{ faq.title }}</faq-title>
            <p class="faq-collapse-content">{{ faq.text }}</p>
            <i class="fa fa-lg fa-chevron-down faq-icon" @click="onCollapseHandler"></i>
        </faq-collapse>
    </div>
</template>

<style lang="less">
    @import "./style/variable.less";
    body {
        margin: @none;
        .app {
          font-family: Avenir, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          height: unit(pow(10,2),vh);
          overflow-x: extract(@overflow,@full + @full);
          overflow-y: extract(@overflow,@full);
          background: linear-gradient(@rotate,@bgColor-1 percentage(@full * 0.1),@bgColor-2 percentage(@full - 0.1));
           .@{baseSelector}title {
              .m(t,3,rem);
              .m(b,0,px);
              text-align: extract(@align,@full);
              font-size: unit(pow(5,2) + 1,px);
              color:@titleColor;
           }
          .@{baseSelector}container {
              max-width: unit(pow(10,2) * 6,px);
              margin: @none extract(@overflow,@full);
              .@{baseSelector}collapse-title{
                 .m(n,0,px);
                 .m(r,40,px);
              }
              .@{baseSelector}collapse-content {
                  display: extract(@display,length(@display));
                  .m(t,10,px);
                  .m(b,10,px);
                  color:@faqBorderColor;
              }
              .@{baseSelector}collapse.active {
                  .@{baseSelector}collapse-content{
                      display: extract(@display,@full);
                  }
              }
              .@{baseSelector}icon {
                  position: extract(@position,@full);
                  right: unit(pow(4,2) + pow(2,2),px);
                  top:percentage(.5);
                  transform: translateY(percentage(-.5));
                  cursor: extract(@cursor,@full);
                  &:hover {
                      color:@color;
                  }
              }
          }
        }
    }
</style>  
