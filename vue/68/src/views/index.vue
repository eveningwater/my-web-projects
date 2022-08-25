<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { LOGO_IMAGE_URL } from '../utils/const';
const AsyncButton = defineAsyncComponent(() => import('@/components/IconButton.vue'));
const AsyncLeftNav = defineAsyncComponent(() => import('./LeftNav.vue'));
const leftNav = ref<{ toggleNav: (v: boolean) => void }>()
</script>
<template>
    <async-button class="nmn-menu-btn" @click="leftNav?.toggleNav(true)"></async-button>
    <async-left-nav ref="leftNav"></async-left-nav>
    <section class="nmn-content">
        <img alt="logo" :src="LOGO_IMAGE_URL" class="nmn-content-avatar" />
        <p class="nmn-content-text">this is content</p>
    </section>
</template>
<style lang="scss" scoped>
.#{$prefix}menu-btn {
    @include setProperty(position,fixed);
    @include setProperty(top,10px);
    @include setProperty(left,10px);
}
.#{$prefix}content {
    @include setProperty(flex-direction,column);
    @include setProperty(height,100vh);
    @extend .flex-center;
    &-avatar {
        @include setProperty(width,150px);
        @include setProperty(border-radius,percentage(.5));
    }
    &-text {
        @include setProperty(color,$white);
        @include setProperty(font-size,18px);
        @include setProperty(line-height,1.5);
        @include setProperty(margin-top,1rem);
        @include setProperty(text-transform,uppercase);
    }
}
</style>