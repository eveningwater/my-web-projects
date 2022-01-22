<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent, onMounted, reactive } from 'vue';
const AsyncLeftSlide = defineAsyncComponent(() => import("./components/LeftSlide.vue"));
const AsyncRightSlide = defineAsyncComponent(() => import("./components/RightSlide.vue"));
const AsyncIcon = defineAsyncComponent(() => import("./components/Icon.vue"));
const state = reactive({
   currentIndex:0,
   width:0,
   position:0,
   leftTransform: {
      translate: "translateX",
      value: ""
   },
   rightTransform: {
     translate: "translateX",
     value: ""
   },
   slideStyle:{
       itemWidth:"",
       slideLeftWidth:"",
       slideRightWidth:"",
       left:"",
       top:""
   }
});
const isHorizontal = () => state.width <= 869;
const slide = {
   setPositionValue() {
      state.width = window.innerWidth;
      state.position = (isHorizontal() ? state.width : window.innerHeight);
   },
   setPosition(){
      const style = {
          itemWidth:isHorizontal() ? state.width + 'px' : "100%",
          slideLeftWidth:isHorizontal() ? state.width * 4 + 'px' : "35%",
          slideRightWidth:isHorizontal() ? state.width * 4 + 'px' : "65%",
          left:isHorizontal() ? -(state.width * 3) + 'px' : "0",
          top:isHorizontal() ? "0" : "-" + 300 + 'vh'
      };
      state.slideStyle = { ...style };
   },
   setTransform() {
       state.leftTransform =  {
         translate: isHorizontal() ? "translateX" : "translateY",
         value: state.position * state.currentIndex + 'px'
       },
       state.rightTransform = {
         translate: isHorizontal() ? "translateX" : "translateY",
         value: -(state.position * state.currentIndex) + 'px'
       }
   }
}
const onChangeSlide = (direction:string) => {
    if (direction === 'up') {
      state.currentIndex++;
      if (state.currentIndex > 3) {
        state.currentIndex = 0;
      }
    } else if (direction === 'down') {
      state.currentIndex--;
      if (state.currentIndex < 0) {
        state.currentIndex = 3;
      }
    }
    slide.setTransform();
}
const onResizeHandler = () => {
   slide.setPositionValue();
   slide.setTransform();
   slide.setPosition();
}
onMounted(() => {
   slide.setPositionValue();
   slide.setPosition();
   window.addEventListener("resize",onResizeHandler);
});
</script>

<template>
    <div class="ds-slider-container">
        <async-left-slide :transform="state.leftTransform" :slideStyle="state.slideStyle"></async-left-slide>
        <async-right-slide :transform="state.rightTransform" :slideStyle="state.slideStyle"></async-right-slide>
        <div class="ds-action-button-group">
           <button type="button" class="ds-action-button ds-action-down-btn" @click="onChangeSlide('down')">
              <async-icon type="down" :width="25" :height="25" color="#535455"></async-icon>
           </button>
           <button type="button" class="ds-action-button ds-action-up-btn" @click="onChangeSlide('up')">
              <async-icon type="up" :width="25" :height="25" color="#535455"></async-icon>
           </button>
        </div>
    </div>
</template>

<style lang="scss">
  @import "./style/app.scss";
</style>
