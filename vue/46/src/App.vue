<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent, ref } from "vue";
const asyncCard = defineAsyncComponent(() => import("./components/Card.vue"));
interface CardType {
  avatar:string;
  cardTitle:string;
  cardContent:string;
  authorName:string;
  authorAvatar:string;
  authorDate:string;
}
const baseURL = "https://www.eveningwater.com/my-web-projects/js/81/images/";
const cover = ref(baseURL + "header.png");
const avatar = ref(baseURL + "avatar.png");
const cardList = ref<Array<CardType>>([
   {
     avatar:cover.value,
     cardTitle:"草帽小子",
     authorName:"蒙奇·D·路飞",
     authorAvatar:avatar.value,
     authorDate:"2022-1-16",
     cardContent:`外号“草帽”路飞，是草帽一伙、草帽大船团船长，极恶的世代之一。 橡胶果实能力者，悬赏金<mark class="cp-mark">15</mark>亿贝里。 梦想是找到传说中的<mark class="cp-mark">One Piece</mark>，成为海贼王。`
   },
   {
     avatar:cover.value,
     cardTitle:"草帽小子",
     authorName:"蒙奇·D·路飞",
     authorAvatar:avatar.value,
     authorDate:"2022-1-16",
     cardContent:`外号“草帽”路飞，是草帽一伙、草帽大船团船长，极恶的世代之一。 橡胶果实能力者，悬赏金<mark class="cp-mark">15</mark>亿贝里。 梦想是找到传说中的<mark class="cp-mark">One Piece</mark>，成为海贼王。`
   },
   {
     avatar:cover.value,
     cardTitle:"草帽小子",
     authorName:"蒙奇·D·路飞",
     authorAvatar:avatar.value,
     authorDate:"2022-1-16",
     cardContent:`外号“草帽”路飞，是草帽一伙、草帽大船团船长，极恶的世代之一。 橡胶果实能力者，悬赏金<mark class="cp-mark">15</mark>亿贝里。 梦想是找到传说中的<mark class="cp-mark">One Piece</mark>，成为海贼王。`
   }
])
</script>

<template>
  <async-card 
    v-for="(item,index) in cardList"
    :key="item.cardTitle + index" 
    :avatar="item.avatar" 
    :cardTitle="item.cardTitle" 
    :cardContent="item.cardContent" 
    :authorName="item.authorName" 
    :authorAvatar="item.authorAvatar" 
    :authorDate="item.authorDate" 
    contentHTML
  ></async-card>
</template>

<style lang="scss">
  .reset {
    @include setComponent(margin,0,null);
    @include setComponent(padding,0,null);
    box-sizing: border-box;
  }
  body {
      @extend .reset;
      * {
         @extend .reset;
      }
      .app {
         font-family: $font-family;
         -webkit-font-smoothing: antialiased;
         -moz-osx-font-smoothing: grayscale;
         @include setComponent(height,100,vh);
         @extend .flex-center,.over-x-hidden,.over-y-auto,.flex-wrap;
         background: $appBgColor;
         .#{$baseSelector}mark {
            color:$markColor;
            @include background($transparent);
            padding: {
                top:2px;
                bottom:2px;
                left:5px;
                right:5px;
            }
         }
      }
  }
</style>
