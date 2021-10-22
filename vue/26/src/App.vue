<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from "vue";
import { Content,Menu,NavList } from "./components/index";
import { contentData } from "./data/content";
const currentMenu = ref("");
const changeMenuHandler = (menu:string) => {
   currentMenu.value = menu;
}
</script>

<template>
   <div class="rna-page-container" :class="{'active':currentMenu === 'close'}">
      <Menu @on-change="changeMenuHandler"></Menu>
      <Content class="rna-content">
         <h1 class="rna-content-title">朝闻雨记</h1>
         <small class="rna-content-info">--夕水(2013年9月4日作)</small>
         <p v-for="(item,index) in contentData" :key="item + index" v-html="item"></p>
      </Content>
   </div>
   <NavList></NavList>
</template>

<style lang="less">
@import "./style/variable.less";
body,html {
  margin: 0;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  .app {
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    background: linear-gradient(135deg,@app_bg_color_1,@app_bg_color_2);
    .rna-page-container {
       transform-origin: left top;
       width: 100%;
       min-height: 100vh;
       background-color: @default_color;
       transition: transform .4s ease-in-out;
       padding: 60px;
       box-sizing: border-box;
       &.active {
          transform: rotate(-20deg);
          & + .rna-nav-list ul {
             transform: translateX(15px);
             & .rna-nav-item {
                transform: translateX(0);
                transition-delay: .4s;
             }
          }
       }
       .rna-content {
            .rna-content-title {
               margin: 0;
               color:@color_active;
               letter-spacing: 2px;
               font-size: 26px;
            }
            .rna-content-info {
               color:@font_color;
               margin-bottom: 15px;
               font-size: 14px;
            }
       }
    }
  }
}
</style>
