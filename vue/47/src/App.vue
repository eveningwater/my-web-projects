<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
    <div class="kl-kinetic square"></div>
    <div class="kl-kinetic angle"></div>
</template>

<style lang="scss">
body {
   @include setComponent(margin,0,px);
   @include setComponent(padding,0,px);
  .app {
    font-family: $font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @include background($appBgColor);
    @extend .flex-center,.over-hidden;
    @include setComponent(height,100,vh);
    .#{$baseSelector}kinetic {
       @extend .el-pos-r;
       @include setComponent(height,150,px);
       @include setComponent(width,150,px);
       @include setComponentPercent(margin-top,25);
       @include setComponentPercent(margin-bottom,25);
       @include setComponentPercent(margin-left,15);
       @include setComponentPercent(margin-right,15);
       &::before,&::after{
          content:"";
          @extend .el-pos-a,.bd-solid;
          @include setComponent(top,0,px);
          @include setComponent(bottom,0,px);
          @include setComponent(left,0,px);
          @include setComponent(right,0,px);
          @include setComponent(border-width,100,px);
          border-color:$transparent;
       }
       &::before {
          transform: rotate(90deg);
          animation: rotateA 4s linear infinite;
       }
       &::after {
          animation: rotateB 4s linear infinite 3s;
       }
       &.square {
          &::before,&::after {
             border-image:$borderSquareColor;
          }
       }
       &.angle {
         &::before,&::after {
             border: {
                bottom-color:$borderAngleColor;
             }
         }
       }
       @keyframes rotateA {
          0%,25% {
              transform: rotate(0deg);
          }
          50%,75% {
              transform: rotate(180deg);
          }
          100% {
              transform: rotate(360deg);
          }
       }
       @keyframes rotateB {
          0%,25% {
              transform: rotate(90deg);
          }
          50%,75% {
              transform: rotate(270deg);
          }
          100% {
              transform: rotate(450deg);
          }
       }
    }
    @media screen and (max-width: 600px){
        .app {
           flex-direction: column;
        }
    }
  }
}
</style>
