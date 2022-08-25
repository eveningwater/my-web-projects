<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent } from 'vue';
const AsyncContainer = defineAsyncComponent(() => import('@/views/index.vue'));
</script>

<template>
    <async-container></async-container>
</template>

<style lang="scss">
    $appBgColor:linear-gradient(135deg,#e9ac5d 10%,#e28b07 90%);
    * {
        @include setProperty(margin,0);
        @include setProperty(padding,0);
        @include setProperty(box-sizing,border-box);
        .app {
            @include setProperty(background,$appBgColor);
            @include setProperty(height,100vh);
            @include setProperty(overflow,hidden);
            @extend .flex-center;
        }
    }
</style>
