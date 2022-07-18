<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { BASE_URL } from './utils/const';
import { CarouselLists } from './utils/type';
const AsyncCarousel = defineAsyncComponent(() => import('./components/Carousel.vue'))
const AsyncCarouselItem = defineAsyncComponent(() => import('./components/CarouselItem.vue'));
const carouselLists = ref<Partial<CarouselLists> []>([])
onMounted(() => {
    for(let i = 0;i <= 5;i++){
      carouselLists.value.push({
         key:(i + 1) + '',
         src: `${BASE_URL}comic-girl-0${(i + 1)}.jpg` 
      })
    }
})
</script>

<template>
    <async-carousel loop showDot>
      <async-carousel-item v-for="item in carouselLists" :key="item.key" :src="item.src"></async-carousel-item>
    </async-carousel>
</template>

<style lang="scss">
    * {
        @include setProperty(margin,0);
        @include setProperty(padding,0);
        @include setProperty(box-sizing,border-box);
        .app {
          @include setProperty(height,100,vh);
          @include setProperty(background,linear-gradient(135deg,#ab4de9 10%,#9016e0 90%));
          @include setProperty(display,flex);
          @include setProperty(justify-content,center);
          @include setProperty(align-items,center);
          @include setProperty(flex-direction,column);
          @include setProperty(padding,20,px);
          @include setProperty(overflow,hidden);
        }
    }
</style>
