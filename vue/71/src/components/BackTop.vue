<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { topIcon } from '../utils/const';
const show = ref(false);
const onScrollHandler = () => {
    const doc = document;
    const { scrollTop,clientHeight } = doc.documentElement || doc.body;
    show.value = scrollTop >= clientHeight - 10;
}
onMounted(() => {
    window.addEventListener('scroll',onScrollHandler);
});
onUnmounted(() => {
    window.removeEventListener('scroll',onScrollHandler);
});
const backgroundIcon = computed(() => `url(${topIcon}) 50% no-repeat #3ee71c`);
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
    @include setProperty(transition,all 2s ease-in-out);
    @include setProperty(transform,scale(0));
    @include setProperty(background-size,40%);
    @include setProperty(background,v-bind(backgroundIcon));
    &.show {
        @include setProperty(transform,scale(1));
    }
}
</style>