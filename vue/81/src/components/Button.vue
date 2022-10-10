<script lang="ts" setup>
    const emit = defineEmits(['click']);
</script>
<template>
    <button type="button" class="bm-play-btn" @click="emit('click')">开始游戏</button>
</template>
<style lang="scss" scoped>
$color: #753200;

.#{$prefix}play-btn {
    @include setProperty(position, absolute);
    @include setProperty(width, 2rem);
    @include setProperty(height, .6rem);
    @include setProperty(left, percentage(0.5));
    @include setProperty(top, percentage(0.5));
    @include setProperty(background, linear-gradient(135deg,#fefefe 10%,#fff 90%));
    @include setProperty(transform, translate(-50%, -50%));
    @include setProperty(font, bold .34rem/.6rem '微软雅黑');
    @include setProperty(text-align, center);
    @include setProperty(color, $color);
    @include setProperty(border-radius,.4rem);
    @include setProperty(letter-spacing,2px);
    @include setProperty(cursor,pointer);
    @include setProperty(outline,none);
    @include setProperty(border,none);
    &:hover {
        @include setProperty(background, linear-gradient(135deg,#e8e8e8 10%,#fff 90%));
    }
}
</style>