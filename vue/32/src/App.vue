<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const sounds = ["applause","boo","gasp","tada","victory","wrong"];
import SoundBoardButton from './components/SoundBoardButton.vue';
</script>

<template>
    <div class="sb-button-container">
      <sound-board-button 
        className="sb-button" 
        v-for="(sound,index) in sounds" 
        :key="sound + index" 
        :source="sound"
      >{{ sound }}</sound-board-button>
    </div>
</template>

<style lang="less">
@import "./style/variable.less";
body,html {
  margin: floor(@half);
  background: linear-gradient(@rotate,@bgColor-1 percentage(@zero-point-1),@bgColor-2 percentage(@zero-point-9));
  height: percentage(@full);
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .flex-center();
    height: inherit;
    .@{baseSelector}button-container{
        text-align: extract(@align,@full);
    }
  }
}
</style>
