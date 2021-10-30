<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent } from '@vue/runtime-core';
import { ref } from 'vue';
import Content from './components/Content.vue';
import Title from './components/Title';
const AsyncLoading = defineAsyncComponent(() => import("./components/Loading"));
const isLoading = ref(false);
const text = ref("");
const headerConfig = {
  headers: {
      Accept: 'application/json',
  }
}
const api = 'https://icanhazdadjoke.com';
const request = async () => {
   isLoading.value = true;
   const res = await fetch(api,headerConfig);
   const data = await res.json();
   isLoading.value = false;
   text.value = data.joke;
}
const onAnotherRequst  = () => request();
const toTranslate = () => {
   const win = window.open("https://www.eveningwater.com/my-web-projects/js/34/");
   win && (win.opener = null);
}
request();
</script>

<template>
    <div class="dj-container">
        <Title class="dj-container-title">Don't Laugh Challenge</Title>
        <Content class="dj-content">{{ text }}</Content>
        <async-loading :style="{ opacity:isLoading ? '1' : '0'}"></async-loading>
        <button type="button" class="dj-btn" @click="onAnotherRequst">Get Another Joke</button>
        <button type="button" class="dj-btn" @click="toTranslate">need to translate?</button>
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
      .flex-center();
      overflow: extract(@overflow,@full);
      height: unit(pow(10,2),vh);
      background: linear-gradient(@rotate,@bgColor-1 percentage(@zero-point-1),@bgColor-2 percentage(@zero-point-9));
      .@{baseSelector}container {
         background: linear-gradient(@rotate,fade(@color,percentage(.8)) percentage(@zero-point-1),@containerBgColor-2 percentage(@zero-point-9));
         border-radius: unit(@full * 10 + 5,px);
         width: percentage(@full);
         max-width: unit(max(600,700,800),px);
         padding:range(30px,50px,20);
         min-height: unit(@full * 3 * pow(10,2),px);
         text-align: extract(@align,@full);
         box-shadow: unit(@full,px) unit(pow(2,2),px) unit(sqrt(225),px) @boxShadowColor;
         .@{baseSelector}container-title {
            letter-spacing: unit(@full + @full,px);
            color:@titleColor;
            margin: @none;
         }
         .@{baseSelector}content {
           @four-unit:unit(pow(2,2) * 10,px);
           max-width: unit(@full * 6 * pow(10,2),px);
           margin:@four-unit extract(@overflow,length(@overflow));
           color:@fontColor;
           line-height:@four-unit;
           font-size: unit(pow(2,2) * 10 - 5,px);
         }
         .@{baseSelector}btn {
            box-shadow: unit(@full,px) unit(pow(2,2) - 1,px) unit(sqrt(144),px) @boxShadowColor;
            border:extract(@display,length(@display));
            color:@color;
            background: linear-gradient(@rotate,@bgColor-1 percentage(@zero-point-1),@bgColor-2 percentage(@zero-point-9));
            padding:range(12px,18px,10);
            display:extract(@display,pow(2,2));
            margin:range(10px,10px,10);
            font-size: unit(@full * 5 + @full * 10,px);
            letter-spacing: unit(@full + @full,px);
            border-radius: unit(pow(4,2) - pow(2,3),px);
            cursor: extract(@cursor,@full);
            transition: all convert(0.03s,"ms") cubic-bezier(0.075, 0.82, 0.165, @full);
            &:focus-visible {
              outline:extract(@display,length(@display));
            }
            &:hover {
              background: linear-gradient(@rotate,@bgColor-2 percentage(@zero-point-1),@bgColor-1 percentage(@zero-point-9));
            }
         }
      }
    }
 }
</style>
