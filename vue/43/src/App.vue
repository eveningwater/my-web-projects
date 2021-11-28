<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent } from '@vue/runtime-core';
import { ref } from 'vue';
const AsyncButton = defineAsyncComponent(() => import("./components/button"));
type CircleType = {
    left:string;
    top:string;
}
const circleList = ref<Array<CircleType>>([]);
const createCircle = (e:MouseEvent) => {
    const { clientX:x,clientY:y,target } = e;
    const { offsetLeft:left,offsetTop:top } = target as HTMLButtonElement;
    circleList.value.push({
      left:(x - left) + 'px',
      top:(y - top) + 'px'
    });
    setTimeout(() => {
        if(circleList.value.length){
           circleList.value.pop();
        }
    },1000);
}
</script>

<template>
    <async-button class="bre-btn" @click="createCircle">
        clicked me!
        <span class="bre-btn-circle" v-for="(circle,index) in circleList" :key="circle.left + index" :style="circle"></span>
    </async-button>
</template>

<style lang="scss">
@import "./style/variable.scss";
body {
  @include reset;
  .app {
    font-family:$font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @include flex-center;
    @extend .overflow-hidden;
    @extend .flex-column;
    background: linear-gradient($app-deg,$appBgColor-1 $app-1,$appBgColor-2 $app-2);
    height: 100 + vh;
    .#{$baseSelector}btn {
        background: linear-gradient($app-deg,$btnBgColor-1 $app-1,$btnBgColor-2 $app-2);
        @include p(null,1,rem);
        @extend .overflow-hidden;
        color:$white;
        &:focus-visible {
          outline: none;
        }
        display: map-get($display, "ib");
        border:none;
        border-radius: 8px;
        font-size: round(17.5) + px;
        letter-spacing: ceil(1.3) + px;
        cursor: pointer;
        position: map-get($position, "r");
        @extend .base-transition;
        text-transform: uppercase;
        &:hover {
           transform: scale(1.1);
        }
        .#{$baseSelector}btn-circle {
           position: map-get($position, "a");
           width: $circleWH;
           height: $circleWH;
           border-radius: percentage(.5);
           $revHalf:percentage(.5);
           transform: translate(-$revHalf,-$revHalf) scale(0);
           @extend .base-transition;
           animation: scale .4s ease-in-out;
           background: linear-gradient($app-deg,$circleBgColor-1 $app-1,$circleBgColor-2 $app-2);
           @keyframes scale {
              to {
                opacity: 0;
                transform: translate($revHalf,$revHalf) scale(3);
              }
           }
        }
    }
  }
}
</style>
