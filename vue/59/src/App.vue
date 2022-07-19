<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { defaultColor, type Key, randomColor, type DefaultColor } from './utils/color';
import { squares } from './utils/const';
const AsyncSquare = defineAsyncComponent(() => import('@/components/square.vue'));
interface SquareItem extends DefaultColor {
    key:string
}
const squareList = ref<SquareItem []>([]);
onMounted(() => {
    for(let i = 0;i < squares;i++){
        squareList.value.push({ ...defaultColor,key: String(i + 1) })
    }
});
const onMouseEnterHandler = (item: SquareItem) => {
    Object.keys(randomColor).forEach((k: string) => item[k as Key] = randomColor[k as Key]())
}
const onMouseLeaveHandler = (item: SquareItem) => {
    setTimeout(() => Object.keys(defaultColor).forEach((k: string) => item[k as Key] = defaultColor[k as Key]),1000)
}
</script>

<template>
      <div class="hb-container">
          <async-square 
            v-for="item in squareList" 
            :key="item.key" 
            @mouseenter="onMouseEnterHandler(item)" 
            @mouseleave="onMouseLeaveHandler(item)"
            :style="{ background:item.bgColor,boxShadow:`0 0 3px ${item.boxColor}`}"
        ></async-square>
      </div>
</template>

<style lang="scss">
    * {
        @include setProperty(margin,0);
        @include setProperty(padding,0);
        @include setProperty(box-sizing,border-box);
    }
    .flex-center {
       @include setProperty(display,flex);
       @include setProperty(justify-content,center);
       @include setProperty(align-items,center);
    }
    body,html {
        .app,.#{$baseSelector}container {
            @extend .flex-center;
            &.app {
                @include setProperty(height,100vh);
                @include setProperty(overflow,hidden);
                @include setProperty(background,linear-gradient(135deg,#112233 10%,#223344 90%));
            }
            &.#{$baseSelector}container {
                @include setProperty(flex-wrap,wrap);
                @include setProperty(max-width,100%);
                @include setProperty(width,400px);
            }
        }
    }
</style>
