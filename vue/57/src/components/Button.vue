<script lang="ts" setup>
import { PropType } from '@vue/runtime-core';
type ButtonNativeType = "button" | "reset" | "submit" | undefined;
const props = defineProps({
    nativeType: {
        type: [String, undefined] as PropType<ButtonNativeType | undefined>,
        default: "button"
    },
    content: String as PropType<string>,
    type: String,
    size: {
        type: String as PropType<string>,
        default: "normal",
        validator: (v: string) => {
            return ['large', 'normal', 'small'].includes(v)
        }
    }
})
</script>
<template>
    <button :type="nativeType" class="ac-btn" :class="{ ['ac-' + props.type]: true, ['ac-' + props.size]: true }">
        <slot>
            <span>{{ props.content }}</span>
        </slot>
    </button>
</template>
<style lang="scss" scoped>
$borderColor: #d4d5d6;
$borderActiveColor: #2c91f7;
$color: fade-out($black, .15);
$activeColor: #2485e6;
$warningColor: #f79c25;
$warningActiveColor: #f1961e;

.#{$baseSelector}btn {
    @extend .el-display-inline-block, .el-cursor-pointer;
    @include setComponent(line-height, 1.57, null);
    @include setComponent(border-radius, 4, px);
    @include setComponent(font-size, 14, px);
    @include setComponent(letter-spacing, 2, px);

    border: {
        width: 1px;
        style: solid;
        color: $borderColor;
    }

    @include color($color);
    @include background($white);

    &:hover,
    &:active {
        @include color($activeColor);
        border-color: $borderActiveColor
    }

    &.#{$baseSelector}warning {
        @include background($warningColor);
        @include color($white);
        border-color: $transparent;

        &:hover {
            @include background($warningActiveColor);
        }
    }

    &.#{$baseSelector}large {
        @include setComponent(padding-top, 12, px);
        @include setComponent(padding-bottom, 12, px);
        @include setComponent(padding-left, 18, px);
        @include setComponent(padding-right, 18, px);
    }

    &.#{$baseSelector}small {
        @include setComponent(padding-top, 4, px);
        @include setComponent(padding-bottom, 4, px);
        @include setComponent(padding-left, 12, px);
        @include setComponent(padding-right, 12, px);
    }
    &.#{$baseSelector}normal {
        @include setComponent(padding-top, 8, px);
        @include setComponent(padding-bottom, 8, px);
        @include setComponent(padding-left, 16, px);
        @include setComponent(padding-right, 16, px);
    }
}
</style>