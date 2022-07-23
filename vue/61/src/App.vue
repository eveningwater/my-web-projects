<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent, ref } from 'vue';
import { tabList,carouselList,type TabListKey } from './utils/data'
const AsyncCarousel = defineAsyncComponent(() =>  import('./components/Carousel'));
const AsyncBottomNav = defineAsyncComponent(() =>  import('./components/BottomNav'));
const currentActive = ref('1');
const onTabClick = (tab:TabListKey) => {
    currentActive.value = tab.key;
}
</script>

<template>
    <div className="mtn-mobile">
        <async-carousel :carouselOptions="carouselList" :currentActive="currentActive"></async-carousel>
        <async-bottom-nav :tabOptions="tabList" @on-tab-click="onTabClick" :currentActive="currentActive"></async-bottom-nav>
    </div>
</template>

<style lang="scss">
    * {
      @include setProperty(margin,0);
      @include setProperty(padding,0);
      @include setProperty(box-sizing,border-box);
    }
    body,html {
      @include setProperty(background,linear-gradient(135deg,#c4e1fc 10%,#67cef7 90%));
      @include setProperty(overflow-y,auto);
      @include setProperty(overflow-x,hidden);
      @include setProperty(height,100%);
      @include setProperty(display,flex);
      @include setProperty(justify-content,center);
      @include setProperty(align-items,center);
        .#{$baseSelector}mobile {
           @include setProperty(max-width,100%);
           @include setProperty(width,350px);
           @include setProperty(height,600px);
           @include setProperty(position,relative);
           @include setProperty(max-height,100%);
           @include setProperty(overflow,hidden);
           @include setProperty(border-radius,15px);
           @include setProperty(border,3px solid #0383b6);
           @include setProperty(box-shadow,0 -2px 3px fade-out(#daf3fd,.32));
        }
        .app {
          @include setProperty(overflow,hidden);
        }
    }
</style>
