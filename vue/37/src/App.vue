<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { reactive } from '@vue/reactivity';
import { readonly, ref } from 'vue';
const state = readonly(reactive({
  navList: [
      {
        href: "/",
        text: "index"
      },
      {
        href: "https://eveningwater.github.io/#/",
        text: "blog"
      },
      {
        href: "https://github.com/eveningwater",
        text: "github"
      },
      {
        href: "https://gitee.com/eveningwater",
        text: "gitee"
      }
  ],
}));
const active = ref("");
const onChangeActive = () => {
   active.value = active.value ? "" : "active";
}
</script>

<template>
      <nav class="an-nav p-20" :class="active">
          <ul class="an-ul">
              <li class="an-li" v-for="(item,index) in state.navList" :key="item.text + index">
                  <a :href="item.href" target="_blank" rel="noopener noreferrer" class="an-link ml-10 mr-10" v-text="item.text"></a>
              </li>
          </ul>
          <button type="button" class="an-btn" @click="onChangeActive">
              <div class="an-line"></div>
              <div class="an-line"></div>
          </button>
      </nav>
</template>

<style lang="scss">
@import "./style/variable";
body {
  @include margin-reset;
  @mixin common-bg {
    background: linear-gradient(135deg,$bgColor-1 10%,$bgColor-2 90%);
  }
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    @include common-bg;
    @include flex-center;
    .#{$baseSelector}nav {
        width: 80px;
        border-radius: 10px;
        background: linear-gradient(135deg,$navBgColor-1 10%,$navBgColor-1 90%);
        transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
        box-shadow: 1px 2px 4px $boxShadowColor;
        box-sizing: border-box;
        @include flex-center;
        .#{$baseSelector}ul{
           display: flex;
           transition: inherit;
           list-style: none;
           @include margin-reset;
           @include padding-reset;
           width: 0;
           .#{$baseSelector}li{
             opacity: 0;
             transform: rotateY(0deg);
             transition: inherit;
             .#{$baseSelector}link {
                color:$fontColor;
                text-decoration: none;
                font-weight: 400;
                position: relative;
                white-space: nowrap;
                font-size: 16px;
                &:hover {
                  color:$bgColor-2;
                }
             }
           }
        }
        .#{$baseSelector}btn {
           width: 40px;
           height: 40px;
           border: none;
           background: $transparent;
           cursor: pointer;
           &:focus-visible {
             outline: none;
           }
           position: relative;
           .#{$baseSelector}line {
              position: absolute;
              @include common-bg;
              left: 10px;
              width: 20px;
              height: 2px;
              transition: inherit;
              &:first-of-type {
                  top: 15px;
              }
              &:last-of-type {
                  bottom: 15px;
              }
           }
        }
        &.active {
          width: 350px;
          .#{$baseSelector}ul {
            width: 100%;
            .#{$baseSelector}li{
              opacity: 1;
              transform: rotateY(1turn);
            }
          }
          .#{$baseSelector}line {
              &:first-of-type {
                  transform: rotate(-765deg) translateY(5.5px);
              }
              &:last-of-type {
                  transform: rotate(765deg) translateY(-5.5px);
              }
           }
        }
    }
  }
}
</style>
