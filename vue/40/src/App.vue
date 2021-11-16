<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent } from '@vue/runtime-core';
import { reactive } from 'vue';
import { DEFAULT_API, SEARCH_API } from './utils/api';
import { MovieDataType } from './utils/data.interface';
const AsyncHeader = defineAsyncComponent(() => import("./components/Header.vue"));
const AsyncMovieItem = defineAsyncComponent(() => import("./components/MovieItem.vue"));
const state = reactive<{ movieList:Array<Partial<MovieDataType>>}>({
    movieList:[]
})
const request = async (url:string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      state.movieList = data.results;
    } catch (error) {
      
    }
}
const onSearchHandler = (e:FocusEvent) => {
    const value = (e.target as HTMLInputElement).value;
    request(SEARCH_API + value);
    setTimeout(() => {
       (e.target as HTMLInputElement).value = "";
    },100)
}
request(DEFAULT_API);
</script>

<template>
    <async-header :onBlur="onSearchHandler"></async-header>
    <main class="ma-main h-100p">
        <ul class="ma-movie-list">
            <async-movie-item v-for="(item,index) in state.movieList" :key="item.title && item.title + index" :item="item"></async-movie-item>
        </ul>
    </main>
</template>

<style lang="scss">
@import "./style/variable.scss";
body {
  @include m(null,0,null);
   @extend .overflow-hidden;
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .#{$baseSelector}main {
        @include flex-100p;
        box-sizing: border-box;
        @extend .bgColor;
        @extend .overflow-hidden;
        .#{$baseSelector}movie-list {
           @include flex-100p;
           flex-wrap: wrap;
           @extend .overflow-hidden;
           list-style: none;
           height: calc(100% - 5rem);
           @include p(-top,1,rem);
           @include p(-bottom,1,rem);
           @include p(-left,0,null);
           @include p(-right,0,null);
           position: relative;
           overflow-y: auto;
           box-sizing: border-box;
        }
    }
  }
}
</style>
