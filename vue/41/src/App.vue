<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { computed, reactive } from '@vue/reactivity';
import { nextTick, onMounted, ref } from 'vue';
import ButtonGroup from './components/ButtonGroup.vue';
import { BASE_URL } from './utils/const';
const state = reactive<{ bsList:Array<{ bg:string }> }>({
   bsList:[]
});
const currentIndex = ref(0);
const container = ref(null);
for(let i = 2;i <= 6;i++){
  state.bsList.push({ bg:i + ".jpg"});
}
const bgURL = computed(() => `url("${BASE_URL + state.bsList[currentIndex.value].bg}")`);
const getImageURL = (v:string) => BASE_URL + v;
const changeBackground = () => {
    nextTick(() => {
       const _container = container.value as unknown as HTMLDivElement;
       if(!_container){
         return;
       }
       const containerParent = _container.parentElement as unknown as HTMLDivElement;
       containerParent.style.backgroundImage = bgURL.value;
    })
}
const onPrevHandler = () => {
    if(currentIndex.value <= 0){
      currentIndex.value = state.bsList.length - 1;
    }
    currentIndex.value--;
    changeBackground();
}
const onNextHandler = () => {
   if(currentIndex.value >= state.bsList.length - 1){
      currentIndex.value = 0;
   }
   currentIndex.value++;
   changeBackground();
}
onMounted(() => changeBackground());
</script>

<template>
    <div class="bs-container" ref="container">
        <div 
          class="bs-item" 
          v-for="(item,index) in state.bsList" 
          :key="item.bg + index" 
          :style="{ 'background-image':`url(${getImageURL(item.bg)})`}"
          :class="{ active:currentIndex === index }"
        ></div>
        <button-group @on-prev="onPrevHandler" @on-next="onNextHandler"></button-group>
    </div>
</template>
<style lang="scss">
  @import "./styles/variable.scss";
  body {
    @include reset;
    @extend .overflow-hidden;
    .app {
        font-family:$font-family;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100vw;
        height: 100vh;
        // not working
        // background-image: v-bind(bgURL);
        @include flex-center;
        @extend .flex-column;
        @extend .overflow-hidden;
        @extend .base-bg;
        @extend .base-transition;
        &::before {
          content:"";
          @extend .position-perfect;
          background: fade-in(rgba($black,.1), .4);
        }
        .#{$baseSelector}container {
            width:clamp(70vw,60vw,100vw);
            height:clamp(70vh,50vh,80vh);
            position: relative;
            @extend .overflow-hidden;
            box-shadow: 0 2px 3px 4px darken(rgba($containerBoxShadowColor-1,.4), 0.1),
                        0 5px 6px 7px lighten(rgba($containerBoxShadowColor-2,.3), 0.2);
            .#{$baseSelector}item {
               width:clamp(70vw,100vw,100vw);
               height:clamp(30vh,100vh,110vh);
               @extend .base-bg;
               @extend .base-transition;
               position: absolute;
               left: -15vw;
               top: -15vh;
               z-index: 1;
               opacity: 0;
               &.active {
                  opacity: 1;
               }
            }
        }
    }
  }
</style>
