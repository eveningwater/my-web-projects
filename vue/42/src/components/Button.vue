<script lang="ts" setup>
    import { PropType } from '@vue/runtime-core';
    type ButtonNativeType = "button" | "reset" | "submit" | undefined;
    const props = defineProps({
        nativeType:{
            type:[String,undefined] as PropType<ButtonNativeType | undefined>,
            default:"button"
        },
        content:String as PropType<string>
    })
</script>
<template>
    <button :type="nativeType" class="tc-btn">
        <slot>{{ props.content }}</slot>
    </button>
</template>
<style lang="scss" scoped>
    @import "../style/variable.scss";
    .#{$baseSelector}btn {
        @include p("-left",20,px);
        @include p("-right",20,px);
        @include p("-top",14,px);
        @include p("-bottom",14,px);
        @include m(null,0,null);
        box-sizing: border-box;
        @extend .light-style;
        box-shadow: 2px 3px 5px $darkColor;
        cursor: pointer;
        border-radius: 8px;
        border: none;
        &:hover {
            transform: scale(1.1);
        }
        &:focus-visible {
            outline: map-get($display,"none");
        }
    }
</style>