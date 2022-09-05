<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent, ref } from 'vue';
import { useWordStore } from './store/store';
import $message from './utils/message';
import { translate, $ } from "./utils/util";
const AsyncVtHeader = defineAsyncComponent(() => import("@/components/VtHeader.vue"));
const AsyncVtContent = defineAsyncComponent(() => import("@/components/VtContent.vue"));
const AsyncVtFooter = defineAsyncComponent(() => import("@/components/VtFooter.vue"));
const wordStore = useWordStore();
const currentLang = ref("en");
const onChangeLangHandler = (lang: string) => currentLang.value = lang;
const onClickHandler = (type: string) => {
  if (type === "clear") {
    wordStore.$patch({ word: "" });
  } else {
    if (!wordStore.word) {
      return $message.warning("请输入需要翻译的单词或语句!");
    }
    const s = $("#translateScript");
    if (s) {
      (s.parentElement as HTMLElement).removeChild(s);
    }
    translate(wordStore.word, currentLang.value);
  }
}
</script>

<template>
  <main class="vt-main">
    <async-vt-header @on-change="onChangeLangHandler"></async-vt-header>
    <async-vt-content></async-vt-content>
    <async-vt-footer @on-footer-click="onClickHandler"></async-vt-footer>
  </main>
</template>

<style lang="scss">
@import "./style/app.scss";
</style>
