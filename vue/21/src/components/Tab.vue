<template>
  <div class="tab-contaienr">
    <div
      class="tab-item"
      v-for="(item, index) in langArr"
      :class="{ 'is-active':(currentLang === item.value) }"
      :key="item.value + index"
      @click="changeCurrentLang(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts">
import emitter from "../event/eventBus";
import { defineComponent, reactive, toRefs, watch } from "vue";
interface LangType {
   label:string,
   value:string
}
const enArr = [
  {
    label: "en",
    value: "en",
  },
  {
    label: "zh",
    value: "zh",
  },
];
const zhArr = [
  {
    label: "英文",
    value: "en",
  },
  {
    label: "中文",
    value: "zh",
  },
];

const changeLangArr = (lang:string):LangType [] => (lang === "en" ? enArr : zhArr);
export default defineComponent({
  setup() {
    const state = reactive({
      langArr:enArr,
      currentLang: "en",
    });
    state.langArr = changeLangArr(state.currentLang);
    watch(
      () => state.currentLang,
      (val: string) => {
        state.langArr = changeLangArr(state.currentLang);
      }
    );
    const changeCurrentLang = (val:string) => {
        state.currentLang = val;
        emitter.$emit("on-change-lang",() => state.currentLang);
    }
    return {
      ...toRefs(state),
      changeCurrentLang
    };
  },
});
</script>

<style lang="less" scoped>
    .tab-contaienr {
        padding:15px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        right: 15px;
        top: 15px;
        .tab-item {
            padding: .6rem .8rem;
            border: 1px solid #f0eff5;
            background-color: #2396ef;
            color: #fff;
            cursor: pointer;
            &:first-of-type {
              border-radius:8px 0 0 8px;
            }
            &:last-of-type {
              border-radius:0 8px 8px 0;
            }
            &.is-active,&:hover {
               box-shadow: 0 3px 12px rgba(0,0,0,.4);
               background-color: #0b6ccc;
            }
        }
    }
</style>