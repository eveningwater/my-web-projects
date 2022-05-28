<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent, ref } from 'vue';
const AsyncTitle = defineAsyncComponent(() => import("@/components/Title.vue"));
const AsyncSwitch = defineAsyncComponent(() => import("@/components/Switch.vue"));
const checkedList = ref([
  {
    value: false,
    text: "Good"
  },
  {
    value: false,
    text: "cheap"
  },
  {
    value: false,
    text: "fast"
  }
]);
const onChangeHandler = (v:boolean,index:number) => {
    if(checkedList.value.every(v => v.value)){
        if(index === 0){
            checkedList.value[2].value = false;
        }else if(index === 1){
            checkedList.value[0].value = false;
        }else {
            checkedList.value[1].value = false;
        }
    }
}
</script>

<template>
  <async-title class="gcf-title">How do you want your project to be?</async-title>
  <div class="flex-center el-fd-column">
      <async-switch 
        v-for="(item,index) in checkedList" 
        :key="item.text + index" 
        v-model="item.value" 
        :label="item.text"
        @change="onChangeHandler($event,index)"
      ></async-switch>
  </div>
</template>

<style lang="scss">
@import "./style/app.scss";
</style>
