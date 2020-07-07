<template>
  <div id="app">
    <transition name="slide">
      <div class="header" v-if="isDown">
        <label class="w-inter-text">写字速度:</label>
        <input type="text" class="w-inter-input" v-model="speed" v-number placeholder="请输入1到100的整数数字"/>
        <button type="button" class="w-inter-btn" @click="updateSpeed">修改速度</button>
      </div>
    </transition>
    <div class="down" @click="isDown = !isDown" :style="{ top: isDown ? '50px' : '15px'}"></div>
    <div class="main" :style="isDown ? ' height:calc(100% - 40px);' : ''">
      <StyleEditor ref="styleEditor" v-bind.sync="currentStyle"></StyleEditor>
      <ResumeEditor ref="resumeEditor" :markdown="currentMarkdown" :enableHtml="enableHtml"></ResumeEditor>
    </div>
    <BottomNav ref="bottomNav" @on-pause="pauseAnimation" @on-skip="skipAnimation"></BottomNav>
  </div>
</template>
<script src="./js/app.js"></script>
<style scoped>
  @import url('./css/app.css');
</style>