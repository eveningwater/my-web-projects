<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
const AsyncTitle = defineAsyncComponent(() => import('@/components/Title.vue'));
const AsyncFooter = defineAsyncComponent(() => import('@/components/Footer.vue'));
const AsyncForm = defineAsyncComponent(() => import('@/components/Form.vue'));
</script>
<template>
    <async-title level="2" class="todo-title">todo-list</async-title>
    <async-form></async-form>
    <async-footer></async-footer>
</template>
<style lang="scss" scoped>
    $titleColor:fade-out(#0881dd,.6);
    .#{$prefix}title {
        @include setProperty(text-align,center);
        @include setProperty(font-size,9rem);
        @include setProperty(color,$titleColor);
        @include setProperty(margin,1rem 0);
    }
</style>