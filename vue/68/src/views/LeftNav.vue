<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { LOGO_IMAGE_URL, navList, NavListType } from '../utils/const';
const AsyncButton = defineAsyncComponent(() => import('@/components/IconButton.vue'));
const AsyncTreeList = defineAsyncComponent(() => import('@/components/TreeList.vue'));
const transformTreeData = (data: any[]) => {
    let i = data.length - 1;
    if (i > -1) {
        do {
            if (Array.isArray(data[i]?.children) && data[i]?.children.length) {
                transformTreeData(data[i]?.children);
            }
            data[i]['id'] = `${i}-${i + 1}`;
        } while (--i >= 0);
    }
}
const treeData = ref<NavListType>();
const active = ref(false);
defineExpose({
    toggleNav: (status: boolean) => {
        active.value = status;
    }
})
onMounted(() => {
    transformTreeData(navList);
    treeData.value = navList;
})
</script>
<template>
    <div class="nmn-nav nmn-nav-first" :class="{ 'active': active }">
        <div class="nmn-nav nmn-nav-second" :class="{ 'active': active }">
            <div class="nmn-nav nmn-nav-third" :class="{ 'active': active }">
                <async-button type="close" class="nmn-nav-close-btn" @click="active = false"></async-button>
                <img :src="LOGO_IMAGE_URL" alt="the logo" class="nmn-nav-avatar" />
                <async-tree-list :tree-data="treeData"></async-tree-list>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
$firstBgColor: linear-gradient(135deg, #eeb784 10%, #e68517 90%);
$secondBgColor: linear-gradient(135deg, #f59841 10%, #ca7009 90%);
$thirdBgColor: linear-gradient(135deg, #eb8c34 10%, #c96e05 90%);

.#{$prefix}nav {
    @include setProperty(position, fixed);
    @include setProperty(left, 0);
    @include setProperty(top, 0);
    @include setProperty(transition, transform .3s cubic-bezier(.065, .45, .155, .9));
    @include setProperty(transform, translateX(-100%));
    @include setProperty(height, 100vh);
    &-close-btn {
        @include setProperty(position,fixed);
        @include setProperty(opacity,.4);
        @include setProperty(right,10px);
        @include setProperty(top,40px);
    }
    &-avatar {
        @include setProperty(border-radius,percentage(.5));
        @include setProperty(width,80px);
    }
    &.active {
        @include setProperty(transform, translateX(0));
    }

    &.#{$prefix}nav-first {
        @include setProperty(width, percentage(.6));
        @include setProperty(min-width, 320px);
        @include setProperty(max-width, 480px);
        @include setProperty(transition-delay, .4s);
        @include setProperty(background, $firstBgColor);

        &.active {
            @include setProperty(transition-delay, 0s);
        }
    }

    &.#{$prefix}nav-second {
        @include setProperty(width, 95%);
        @include setProperty(background, $secondBgColor);
        @include setProperty(transition-delay, .2s);

        &.active {
            @include setProperty(transition-delay, .2s);
        }
    }

    &.#{$prefix}nav-third {
        @include setProperty(width, 95%);
        @include setProperty(padding, 40px);
        @include setProperty(position, relative);
        @include setProperty(background, $thirdBgColor);
        @include setProperty(transition-delay, 0s);

        &.active {
            @include setProperty(transition-delay, 0.4s);
        }
    }
}
</style>