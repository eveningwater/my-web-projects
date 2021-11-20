<script setup lang="ts">
    const emit = defineEmits(["on-prev","on-next"]);
</script>
<template>
    <button type="button" class="bs-btn bs-prev" @click="(e:MouseEvent) => emit('on-prev',e)">&larr;</button>
    <button type="button" class="bs-btn bs-next"  @click="(e:MouseEvent) => emit('on-next',e)">&rarr;</button>
</template>
<style lang="scss" scoped>
    @import "../styles/variable.scss";
    $btnBorderColor:#a50aec;
    .#{$baseSelector}btn {
        background: transparentize(rgba($black,.4), 0.4);
        position: fixed;
        padding:clamp(10px,20px,30px);
        font-size: clamp(35px,25px,40px);
        cursor: pointer;
        border: {
            radius:8px;
            width:4px;
            style:solid;
            color:fade-out(rgba($btnBorderColor,.7),.3);
        }
        color:$white;
        top: percentage(.5);
        $half:percentage(.5);
        transform: translateY(-$half);
        @extend .base-transition;
        &:focus-visible {
            outline: map-get($display,"none");
        }
        &.#{$baseSelector}prev {
            left: calc(15vw - 80px);
            border-right: 0;
        }
        &.#{$baseSelector}next {
            right: calc(15vw - 80px);
            border-left: 0;
        }
        &:hover {
            background-color: $btnBorderColor;
        }
    }
</style>