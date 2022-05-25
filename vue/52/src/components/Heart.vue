<script setup lang="ts"></script>
<template>
    <div class="dch-heart"></div>
</template>
<style lang="scss" scoped>
@keyframes scale {
    0% {
        transform: scale(1) rotate(45deg);
    }

    30%,
    60% {
        transform: scale(1.2) rotate(45deg);
    }

    90%,
    99% {
        transform: scale(1.4) rotate(45deg);
    }

    100% {
        transform: scale(1.1) rotate(45deg);
    }
}

@keyframes grow {
    to {
        transform: scale(5) rotate(45deg);
        opacity: 0;
    }
}

.#{$baseSelector}heart {
    @include setComponent(width, 25, px);
    @include setComponent(height, 25, px);
    @include setComponent(margin-top, 30, px);
    @include setComponent(margin-left, 15, px);
    @include setComponent(margin-right, 15, px);
    @extend .el-display-inline-block, .el-pos-r;
    transform: rotate(45deg);
    @include background($heartBgColor);

    &.scale {
        animation: scale .3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
    }

    &.grow {
        z-index: 100;
        animation: grow .5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        transform: scale(0) rotate(45deg);
        opacity: 1;
    }

    &::before,
    &::after {
        content: "";
        @include setComponentPercent(width, 100);
        @include setComponentPercent(height, 100);
        @include setComponentPercent(border-radius, 50);
        @include background($heartBgColor);
        @extend .el-pos-a;
    }

    &::before {
        left: 0;
        top: -15px;
    }

    &::after {
        left: -15px;
        top: 0;
    }
}
</style>