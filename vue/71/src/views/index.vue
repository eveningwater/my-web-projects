<script lang="ts" setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { getRandomSize, URL } from '../utils/const';
const AsyncTitle = defineAsyncComponent(() => import('@/components/Title.vue'));
const AsyncRandomList = defineAsyncComponent(() => import('@/components/RandomList.vue'));
const AsyncBackTop = defineAsyncComponent(() => import('@/components/BackTop.vue'));
const imageList = ref<{ src: string, alt: string }[]>();
const loadImage = (rows = 5) => {
    imageList.value = [];
    let i = rows * 3;
    do {
        imageList.value.push({
            src: `${URL}${getRandomSize()}x${getRandomSize()}`,
            alt: `randomImage-${i + 1}`
        })
    } while (--i > 0);    
}
onMounted(() => {
    loadImage();
})
</script>
<template>
    <div class="rif-container">
        <async-title confirm-title="Clicked me to refresh the images" class="rif-container-title" @click="loadImage()">
            random-image-feed
        </async-title>
        <async-random-list :list="imageList"></async-random-list>
        <async-back-top />
    </div>
</template>
<style lang="scss" scoped>
$beforeBorderColor: #e7880c;
$afterBgColor: #e7880c;

.#{$prefix}container {
    @extend .flex-center;
    @include setProperty(flex-direction, column);

    &-title {
        @include setProperty(font-size, percentage(1.5));
        @include setProperty(color, $white);
        @include setProperty(cursor, pointer);
        @include setProperty(margin, 1rem 0);
        @include setProperty(position, relative);

        &::before,
        &::after {
            @include setProperty(position, absolute);
            @include setProperty(left, percentage(.5));
            @include setProperty(transform, translateX(-50%));
            @include setProperty(transition, visibility .4s ease-in-out);
            @include setProperty(visibility, hidden);
        }

        &::before {
            @include setProperty(content, "");
            @include setProperty(width, 0);
            @include setProperty(height, 0);
            @include setProperty(border, 30px solid transparent);
            @include setProperty(top, 0);
            @include setProperty(z-index, 0);
            @include setProperty(border-bottom-color, $beforeBorderColor);
        }

        &::after {
            @include setProperty(content, attr(confirm-title));
            @include setProperty(min-width, percentage(1));
            @include setProperty(font-size, 14px);
            @include setProperty(border-radius, 10px);
            @include setProperty(padding, .2rem .4rem);
            @include setProperty(margin-top, .4rem);
            @include setProperty(z-index, 1);
            @include setProperty(top, percentage(1));
            @include setProperty(background, $afterBgColor);
        }

        &:hover {

            &::before,
            &::after {
                @include setProperty(visibility, visible);
            }
        }
    }
}
</style>