<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import Title from './components/Title.vue';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const BASE_URL = "https://eveningwater.com/my-web-projects/js/65/images/";
const splitList = [
   {
      text:"Shirahoshi",
      type:"left",
      href:"https://baike.baidu.com/item/%E7%99%BD%E6%98%9F/34180?fromtitle=%E7%99%BD%E6%98%9F%E5%85%AC%E4%B8%BB&fromid=4377673&fr=aladdin"
   },
   {
     text:"Zanilia",
     type:"right",
     href:"https://baike.baidu.com/item/%E8%B5%B5%E4%B8%BD%E9%A2%96/10075976?fr=aladdin"
   }
]
const getPanelBg = computed(() => (type:string) => `url(${BASE_URL + type + ".png"})`);
const parentClass = ref("");
const onMouseEnterHandler = (type:string) => {
    parentClass.value = "hover-" + type;
}
const onMouseLeaveHandler = () => {
    parentClass.value = "";
}
</script>

<template>
    <div class="sp-container" :class="parentClass">
      <div class="sp-panel" 
        v-for="(item,index) in splitList" 
        :key="item.type + index" 
        :class="`sp-${item.type}-panel`"
        :style="{ backgroundImage:getPanelBg(item.type) }"
        @mouseenter="onMouseEnterHandler(item.type)"
        @mouseleave="onMouseLeaveHandler"
      >
         <Title class="sp-title" level="3">the {{ item.type }} panel</Title>
         <a :href="item.href" target="_blank" rel="noopener noreferrer" class="sp-link">{{ item.text }}</a>
      </div>
    </div>
</template>

<style lang="less">
@import "./style/variable.less";
body {
  margin: 0;
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: unit(100,vh);
    .sp-container {
      width:percentage(@full);
      height:percentage(@full);
      position: extract(@position,1);
      &.hover-left {
         .sp-left-panel {
            width: percentage(@percent-8);
         }
         .sp-right-panel {
            width: percentage(@percent-2);
         }
      }
      &.hover-right {
         .sp-left-panel {
            width: percentage(@percent-2);
         }
         .sp-right-panel {
            width: percentage(@percent-8);
         }
      }
      .sp-panel {
        width:percentage(@half);
        height:inherit;
        position: extract(@position,2);
        .flex-center();
        background-size: cover;
        background-repeat: no-repeat;
        .all-transition();
        .sp-title {
            font-size: unit(2,rem);
            color:@color;
            white-space: nowrap;
        }
        .sp-link {
           width: unit(15,rem);
           padding: range(1rem);
           text-decoration: none;
           border-radius: unit(@percent-8 * 10,px);
           border: unit(@percent-2 + 0.1,rem) solid @color;
           font-size: unit(@percent-8 * 2 - 0.1,rem);
           background-color: @transparent;
           text-transform: extract(@text-transform,1);
           top: unit((@percent-2 - 0.1) * 10,px);
           z-index: unit(@percent-2 * 10);
           position: extract(@position,1);
           text-align: center;
           letter-spacing: unit(@percent-2 * 10,px);
           color:fadeOut(@color,40%);
        }
        &.sp-left-panel {
          left: 0;
          &::before {
            background-color: @leftBgColor;
          }
          .sp-link:hover {
             color:@leftHoverColor;
             border-color: @leftHoverColor;
          }
        }
        &.sp-right-panel {
          right: 0;
          &::before {
            background-color: @rightBgColor;
          }
          .sp-link:hover {
             color:@rightHoverColor;
             border-color: @rightHoverColor;
          }
        }
        &:before {
           content:"";
           width: percentage(@full);
           height: inherit;
           position: extract(@position,2);
           .all-transition();
        }
      }
    }
  }
}
</style>
