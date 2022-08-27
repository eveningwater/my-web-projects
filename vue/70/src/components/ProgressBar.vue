<script lang="ts" setup></script>
<template>
    <div class="tbs-progress-bar"></div>
</template>
<style lang="scss" scoped>
.#{$prefix}progress-bar {
    @include setProperty(width,percentage(1));
    @include setProperty(height,4px);
    @include setProperty(background-color,$white);
    @include setProperty(transform-origin,left);
    @include setProperty(animation,grow 10s linear infinite);
    @keyframes grow {
        0% {
            @include setProperty(transform,scaleX(0));
        }
    }
}
</style>