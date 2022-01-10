<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { computed, ref } from 'vue';
const image_url = "https://www.eveningwater.com/my-web-projects/js/26/img/";
const random = () => Math.floor(Math.random() * 15);
const dragList = ref<Array<{ dragItem:string,dragClass:string }>>([]);
const currentIndex = ref(0);
const showImageUrl = computed(() => image_url + random() + '.jpg');
const fillClass = ref("dnd-drag-fill");
for(let i = 0;i < 5;i++){
   dragList.value.push({ dragItem:"div",dragClass:"dnd-drag-item" });
}
const onDragOverHandler = (e:MouseEvent) => e.preventDefault();
const onDragEnterHandler = (e:MouseEvent,index:number) => {
    e.preventDefault();
    if(dragList.value[index].dragClass.indexOf("drag-active") === -1){
       dragList.value[index].dragClass += " drag-active";
    }
}
const onDragLeaveHandler = (e:MouseEvent,index:number) => dragList.value[index].dragClass = "dnd-drag-item";
const onDragDropHandler = (e:MouseEvent,index:number) => {
  dragList.value[index].dragClass = "dnd-drag-item";
  currentIndex.value = index;
};
const onDragStartHandler = () => {
   if(fillClass.value.indexOf("drag-move") === -1){
      fillClass.value += " drag-move";
   }
}
const onDragEndHandler = () => {
   fillClass.value = "dnd-drag-fill";
}
</script>

<template>
    <div class="dnd-drag-list">
       <component 
          v-for="(item,index) in dragList" 
          :key="item.dragItem + index" 
          :is="item.dragItem" 
          :class="item.dragClass"
          @dragover="onDragOverHandler"
          @dragenter="onDragEnterHandler($event,index)"
          @dragleave="onDragLeaveHandler($event,index)"
          @drop="onDragDropHandler($event,index)"
       >
          <div 
            draggable="true" 
            :class="{ invisible:currentIndex !== index,[fillClass]:true }" 
            :style="{ backgroundImage:`url(${showImageUrl})`}"
            @dragstart="onDragStartHandler"
            @dragend="onDragEndHandler"
            v-if="currentIndex === index"
          ></div>   
       </component>
    </div>
</template>

<style lang="scss">
body {
  @include setComponent(margin,0,null);
  @include setComponent(padding,0,null);
  .app {
    font-family: $font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @extend .flex-center,.over-hidden;
    @include setComponent(height,100,vh);
    @include background($appBgColor);
    .#{$baseSelector}drag-list {
       @extend .el-jc-space-between,.el-display-flex,.flex-wrap;
       .#{$baseSelector}drag-item {
          @include setComponent(width,200,px);
          @include setComponent(height,200,px);
          @include setComponent(border-width,2,px);
          @include setComponent(border-radius,10,px);
          @include setComponent(margin-left,15,px);
          @include setComponent(margin-right,15,px);
          @include background($dragItemBgColor);
          @extend .bd-solid,.el-cursor-pointer,.el-pos-r;
          border: {
             color:$dragItemBorderColor;
          }
          &.drag-active {
             @include setComponent(border-width,2,px);
             @include background($dragItemBgActiveColor);
             @extend .bd-dashed;
             border: {
                color:$dragItemBorderActiveColor;
             }
          }
          .#{$baseSelector}drag-fill {
             @extend .el-pos-a;
             @include setComponent(top,0,null);
             @include setComponent(bottom,0,null);
             @include setComponent(left,0,null);
             @include setComponent(right,0,null);
             @include setComponent(border-radius,10,px);
             background: {
                size:cover;
                repeat:no-repeat;
                position:percentage(.5);
             }
             &.invisible {
                visibility: hidden;
             }
             &.drag-move {
                @include setComponent(border-width,5,px);
                @extend .bd-solid;
                border: {
                   color:$dragFillBorderActiveColor;
                }
             }
          }
       }
    }
  }
}
</style>
