<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  
</template>

<style lang="scss">
    $background:linear-gradient(135deg,#8a77f5 10%,#4d32e9 90%);
    * {
      @include setProperty(margin,0);
      @include setProperty(padding,0);
      @include setProperty(box-sizing,border-box);
    }
    body,html {
       @include setProperty(background,$background);
       @include setProperty(overflow,hidden);
       @include setProperty(overflow-y,auto);
       @include setProperty(height,100%);
    }
</style>
