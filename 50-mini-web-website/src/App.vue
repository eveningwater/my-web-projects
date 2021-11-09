<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent } from '@vue/runtime-core';
const AsyncSelect = defineAsyncComponent(() => import("./components/Select.vue"));
const AsyncOption = defineAsyncComponent(() => import("./components/Option.vue"));
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
]
</script>

<template>
    <div class="mini-web-container">
        <header class="mini-web-header">
            <p class="">The 50 mini web project</p>
            <async-select class="mini-web-header-select">
               <async-option v-for="(type,index) in typeList" :key="type.value + index" :value="type.value" :label="type.label">{{ type.label }}</async-option>
            </async-select>
        </header>
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
          }
        }
    }
  }
}
</style>
