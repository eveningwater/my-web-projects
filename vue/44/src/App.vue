<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineAsyncComponent } from '@vue/runtime-core';
import { onMounted, reactive,ref } from 'vue';
import { colorOption } from './utils/color-picker-option';
const AsyncColorPicker = defineAsyncComponent(() => import("./components/ColorPicker.vue"));
const AsyncButton = defineAsyncComponent(() => import("./components/Button.vue"));
const AsyncInput = defineAsyncComponent(() => import("./components/Input.vue"));
const canvasContainer = ref<HTMLCanvasElement | null>(null);
type PositionType = {
   x:number,
   y:number
}
interface StateType {
   size:number;
   color:string;
   position:Partial<PositionType>;
   isPressed:boolean;
   ctx:CanvasRenderingContext2D | null
}
const state = reactive<Partial<StateType>>({
   size:5,
   color:"black",
   position:{
     x:undefined,
     y:undefined
   },
   isPressed:false,
   ctx:null
});
onMounted(() => {
    state.ctx = (canvasContainer.value as HTMLCanvasElement).getContext("2d")
});
const onClearPickerHandler = () => {
   state.color = "black";
}
const onSurePickerHandler = (value:string) => {
   state.color = value;
}
const onChangeHandler = (e:Event) => {
   let val = (e.target as HTMLInputElement).value;
   const value = Number(val);
   if(Number.isNaN(value)){
      (e.target as HTMLInputElement).value = "5";
   }else {
      if(value > 50){
         (e.target as HTMLInputElement).value = "50";
      }
      if(value < 5){
         (e.target as HTMLInputElement).value = "5";
      }
   }
}
const onDecreaseHandler = () => {
   const size = state.size;
   if(size && size > 5){
      (state.size as number) -= 5;
   }
}
const onIncreaseHandler = () => {
   const size = state.size;
   if(size && size < 50){
      (state.size as number) += 5;
   }
}
const onClearHandler = () => {
   if(!state.ctx){
      return;
   }
   const { width,height } = canvasContainer.value?.getBoundingClientRect() as DOMRect;
   state.ctx.clearRect(0,0,width,height);
}
const onMouseDownHandler = (e:MouseEvent) => {
   state.isPressed = true;
   const { offsetX,offsetY } = e;
   state.position && (state.position.x = offsetX);
   state.position && (state.position.y = offsetY);
}
const drawCircle = (x:number,y:number) => {
    if(!state.ctx){
      return;
    }
    const { size,color } = state;
    state.ctx.beginPath();
    state.ctx.arc(x,y,size as number,0,Math.PI);
    state.ctx.fillStyle = color as string;
    state.ctx.fill();
}
const drawLine = (x1:number,y1:number,x2:number,y2:number) => {
    if(!state.ctx){
      return;
    }
    const { size,color } = state;
    state.ctx.beginPath();
    state.ctx.strokeStyle = color as string;
    state.ctx.lineWidth = (size as number) * 2;
    //If you don't set the `lineCap` to `round`,the line style is a bit range,like gears.
    state.ctx.lineCap = "round";
    state.ctx.moveTo(x1,y1);
    state.ctx.lineTo(x2,y2);
    state.ctx.stroke();
}
const onMouseMoveHandler = (e:MouseEvent) => {
    const { x,y } = state.position ? state.position : { x:undefined,y:undefined };
    const { offsetX,offsetY } = e;
    if(state.isPressed){
       drawCircle(offsetX,offsetY);
       drawLine(x as number,y as number,offsetX,offsetY);
       state.position && (state.position.x = offsetX);
       state.position && (state.position.y = offsetY);
    }
}
const onMouseUpHandler = () => {
  state.isPressed = false;
  state.position && (state.position.x = undefined);
  state.position && (state.position.y = undefined);
}
</script>

<template>
    <div class="da-tool">
        <async-button native-type="button" class="da-decrease" @click="onDecreaseHandler">-</async-button>
        <async-input class="da-size-input" v-model="state.size" @change="onChangeHandler"></async-input>
        <async-button native-type="button" class="da-increase" @click="onIncreaseHandler">+</async-button>
        <async-color-picker class="da-color-picker" :option="{ ...colorOption,...{ clear:onClearPickerHandler,sure:onSurePickerHandler } }"></async-color-picker>
        <async-button native-type="button" class="da-clear" @click="onClearHandler">&times;</async-button>
    </div>
    <canvas 
      class="da-board" 
      width="800" 
      height="600" 
      ref="canvasContainer" 
      @mousedown="onMouseDownHandler" 
      @mousemove="onMouseMoveHandler" 
      @mouseup="onMouseUpHandler"
    ></canvas>
</template>

<style lang="scss">
body {
  @extend .reset;
  .app {
    font-family: $font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .#{$baseSelector}tool,.#{$baseSelector}board {
        width: percentage(1);
        max-width: $containerWidth;
        @extend .m-auto;
        @extend .el-block;
        &.#{$baseSelector}tool{
           @extend .el-position-r;
           @extend .tool-bg;
           @extend .el-flex;
           height: 80px;
           @include m("b",8,px);
           @include m("t",8,px);
           @include p(null,20,px);
           box-sizing: border-box;
           .#{$baseSelector}color-picker {
             @extend .el-inline-block;
             @include m("l",3,px);
             @include m("r",3,px);
           }
           .#{$baseSelector}decrease,.#{$baseSelector}increase {
              @include m("r",8,px);
           }
           .#{$baseSelector}size-input {
              @extend .w-85-px;
              @include m("r",8,px);
           }
           .#{$baseSelector}clear {
              @extend .el-position-a;
              right: 15px;
           }
        }
        &.#{$baseSelector}board {
            max-height: 700px;
            height: percentage(1);
            border: {
               width:2px;
               style:solid;
               color:$boardBorderColor;
            }
        }
    }
  }
}
</style>
