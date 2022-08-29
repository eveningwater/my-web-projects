<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
const show = ref(false);
const onScrollHandler = () => {
    const doc = document;
    const { scrollTop,clientHeight,scrollHeight } = doc.documentElement || doc.body;
    show.value = scrollTop + clientHeight >=  scrollHeight;
}
onMounted(() => {
    window.addEventListener('scroll',onScrollHandler);
});
onUnmounted(() => {
    window.removeEventListener('scroll',onScrollHandler);
});
const backgroundIcon = computed(() => `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E %3Cpath fill='%23ffffff' d='M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z'%3E%3C/path%3E %3C/svg%3E")50% no-repeat #c47004`);
</script>
<template>
    <a href="#top" class="rif-back-btn" :class="{ show:show }">&nbsp;</a>
</template>
<style lang="scss" scoped>
.#{$prefix}back-btn {
    @include setProperty(position,fixed);
    @include setProperty(right,15px);
    @include setProperty(bottom,15px);
    @include setProperty(width,30px);
    @include setProperty(height,30px);
    @include setProperty(transition,all .4s ease-in-out);
    @include setProperty(transform,scale(0));
    @include setProperty(background,v-bind(backgroundIcon));
    @include setProperty(background-size,40%);
    @include setProperty(display,block);
    @include setProperty(border-radius,8px);
    &.show {
        @include setProperty(transform,scale(1));
    }
}
</style>