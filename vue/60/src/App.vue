<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { handleData, pokeCount, PokeListItem, requestURL } from './utils/const';
const AsyncTitle = defineAsyncComponent(() => import('@/components/Title.vue'));
const AsyncPokeCard = defineAsyncComponent(() => import('@/components/pokeCard.vue'));
const pokeList = ref<PokeListItem []>([])
const request = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    pokeList.value.push(handleData(data))
}
onMounted(async () => {
    for(let i = 1;i <= pokeCount;i++){
        await request(requestURL + i)
    }
})
</script>

<template>
    <async-title class="poke-title">pokedex</async-title>
    <div class="poke-container">
        <async-poke-card 
            v-for="item in pokeList" 
            :key="item.name" 
            :avatar="item.avatar" 
            :background="item.background"
            :number="item.number"
            :name="item.name"
            :type="item.type"
        ></async-poke-card>
    </div>
</template>

<style lang="scss">
    * {
       @include setProperty(margin,0);
       @include setProperty(padding,0);
       @include setProperty(box-sizing,border-box);
    }
    body,html {
        @include setProperty(overflow,hidden);
        @include setProperty(overflow-y,auto);
        @include setProperty(background,linear-gradient(135deg,#b3d5f7 10%,#0f7fee 90%));
        .#{$baseSelector}title {
           @include setProperty(color,#fff);
           @include setProperty(text-align,center);
           @include setProperty(margin,2rem);
           @include setProperty(font-size,3rem);
           @include setProperty(letter-spacing,2px);
        }
        .#{$baseSelector}container {
          @include setProperty(display,flex);
          @include setProperty(flex-wrap,wrap);
          @include setProperty(justify-content,center);
          @include setProperty(align-items,flex-start);
          @include setProperty(max-width,1400px);
          @include setProperty(margin,0 auto);
        }
    }
</style>
