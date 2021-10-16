<template>
   <component :is="'h' + level">
       <slot>{{ content }}</slot>
   </component>
</template>

<script setup>
   import { defineProps } from '@vue/runtime-core';
   const props = defineProps({
       level:{
           type:[String,Number],
           default:1
       },
       content:String
   });
</script>

<style>

</style>