<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { computed, ref } from '@vue/reactivity';
import { langText } from './utils/const';
import type { CommonLangType } from './utils/const';
import { defineAsyncComponent, nextTick } from '@vue/runtime-core';
const AsyncButton = defineAsyncComponent(() => import("./components/Button.vue"));
const AsyncClock = defineAsyncComponent(() => import("./components/Clock.vue"));

type LangValueType = "en" | "zh";
const currentLang = ref<LangValueType>("zh");
const currentMode = ref("light");

const firstBtnText = computed(() => {
   const mode = currentMode.value === "light" ? "dark" : "light";
   return langText[currentLang.value][("mode-"+ mode + "-text") as keyof CommonLangType];
});
const secondBtnText = computed(() => {
    const lang = currentLang.value === "zh" ? "en" : "zh";
    return langText[lang][("lang-text") as keyof CommonLangType];
});
const handleClassName = () => {
    const appInstance = document.querySelector(".app");
    if(currentMode.value === "dark"){
       appInstance?.classList.add("dark");
    }else{
       appInstance?.classList.remove("dark");
    }
}
const onChangeModeHandler = () => {
    currentMode.value = currentMode.value === "light" ? "dark" : "light";
    nextTick(() => {
      handleClassName()
    })
}
const onChangeLangHandler = () => {
   currentLang.value = currentLang.value === "en" ? "zh" : "en";
}
</script>

<template>
    <div class="tc-btn-group">
       <async-button native-type="button" @click="onChangeModeHandler">{{ firstBtnText }}</async-button>
       <async-button native-type="button" @click="onChangeLangHandler">{{ secondBtnText }}</async-button>
    </div>
    <async-clock :lang="currentLang"></async-clock>
</template>

<style lang="scss">
@import "./style/variable.scss";
body {
   @include reset;
  .app {
    font-family:$font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @extend .overflow-hidden;
    @include flex-center;
    @extend .flex-column;
    @extend .base-transition;
    @extend .light-style;
    height: 100 + vh;
    &.dark {
      @extend .dark-style;
      .#{$baseSelector}clock {
         border-color: $lightColor;
         background-color: $darkColor;
      }
      .#{$baseSelector}btn {
         @extend .dark-style;
         box-shadow: 2px 3px 5px $lightColor;
      }
      .#{$baseSelector}clock-container >
      .#{$baseSelector}clock >
      .#{$baseSelector}center-point::after {
         background-color: $lightColor;
      }
      .#{$baseSelector}clock-container >
      .#{$baseSelector}date > 
      .#{$baseSelector}circle {
         @extend .light-style;
      }
    }
    .#{$baseSelector}btn-group {
       @include flex-space;
       width: percentage(1);
       $maxWidth:250px,300px,350px;
       max-width: max($maxWidth...);
    }
  }
}
</style>
