<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { computed } from '@vue/reactivity';
import { defineAsyncComponent, reactive, ref, watch } from 'vue';
import { url } from './utils/const';

const AsyncBackground = defineAsyncComponent(() => import('./components/background'));
const AsyncTitle = defineAsyncComponent(() => import('./components/Title.vue'));

const formState = reactive({
    email:"",
    password:""
});

const blurVal = ref(0);
const backgroundURL = computed(() => url)
watch(() => formState.password,(val: string) => {
    blurVal.value = 20  - val.length * 2;
},{ immediate:true })
</script>

<template>
      <async-background :url="backgroundURL" :value="blurVal"></async-background>
      <div class="bg-white rounded p-10 text-center shadow-md">
          <async-title class="text-3xl text-blue-300">Image Password Strength</async-title>
          <p class="text-sm text-gray-700 mt-2">Change the password to see the effect</p>
          <div class="my-4 text-left">
              <label class="text-gray-900">Email</label>
              <input type="text" class="border block w-full p-2 mt-2 rounded" placeholder="enter email" v-model="formState.email">
          </div>
          <div class="my-4 text-left">
              <label class="text-gray-900">Password</label>
              <input type="text" class="border block w-full p-2 mt-2 rounded" placeholder="enter password" v-model="formState.password">
              <button class="bg-black text-white py-2 inline-block mt-4 w-full rounded" type="button">Submit</button>
          </div>
      </div>
</template>

<style lang="scss">
    .app {
       @include setProperty(display,flex);
       @include setProperty(height,100vh);
       @include setProperty(justify-content,center);
       @include setProperty(align-items,center);
       @include setProperty(overflow,hidden);
    }
</style>
