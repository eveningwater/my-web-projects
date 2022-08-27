<script lang="ts" setup>
import { defineAsyncComponent, PropType, ref, toRefs } from 'vue';
const AsyncPreview = defineAsyncComponent(() => import('./Preview.vue'));
const props = defineProps({
    list: {
        type: Array as PropType<{ src: string, alt: string }[]>,
        default: () => ([])
    }
});
const { list } = toRefs(props);
const currentImage = ref<string>();
const showPreview = ref(false);
const onPreviewHandler = (v: string) => {
    currentImage.value = v;
    showPreview.value = true;
}
</script>
<template>
    <div class="rif-list">
        <img v-for="(item, index) in list" :key="item.alt + index" :src="item.src" :alt="item.alt"
            class="rif-list-image" @click="onPreviewHandler(item.src)"/>
    </div>
    <async-preview :src="currentImage" v-model="showPreview"></async-preview>
</template>
<style lang="scss" scoped>
$boxShadow: 1px 1px 8px #e7901f;

.#{$prefix}list {
    @extend .flex-center;
    @include setProperty(flex-wrap, wrap);
    @include setProperty(max-width, 1000px);

    &-image {
        @include setProperty(object-fit, cover);
        @include setProperty(width, 300px);
        @include setProperty(height, 300px);
        @include setProperty(margin, percentage(.01));
        @include setProperty(border-radius, 8px);
        @include setProperty(cursor, pointer);
        @include setProperty(max-width, percentage(1));
        @include setProperty(transition, all .4s ease-in);
        @include setProperty(box-shadow, $boxShadow);
    }
}
</style> 