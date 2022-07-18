<template>
    <div class="ic-carousel-item" ref="item" :style="{ width: currentWidth + 'px' }">
        <img :src="src" :alt="alt" class="ic-carousel-item-img">
    </div>
</template>
<script setup lang="ts" name="CarouselItem">
    import { onMounted, PropType, ref } from 'vue';

    const props = defineProps({
        src:String as PropType<string>,
        key: [String,Number] as PropType<string | number>,
        alt: {
            type:String as PropType<string>,
            default:''
        }
    })
    const item = ref(null);
    const currentWidth = ref(0);
    onMounted(() => {
        if(item){
            const offsetWidth = (item.value as unknown as HTMLDivElement).parentElement?.offsetWidth;
            currentWidth.value = offsetWidth || 200;
        }
    })
</script>
<style scoped lang="scss">
    .#{$baseSelector}carousel-item {
        @include setProperty(position,relative);
        @include setProperty(width,100%);
        @include setProperty(max-height,100%);
        @include setProperty(height,470px);
        // 这一行代码很有必要
        @include setProperty(flex,none);
        &-img {
            @include setProperty(width,100%);
            @include setProperty(height,100%);
            @include setProperty(object-fit,cover);
        }
    }
</style>