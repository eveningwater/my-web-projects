<script lang="ts" setup>
    import { PropType } from 'vue';
    const props = defineProps({
        modelValue:Boolean as PropType<boolean>,
        label:String as PropType<string>
    });
    const emit = defineEmits(["update:modelValue"]);
    const onChangeHandler = (e:Event) => {
        emit('update:modelValue',(e.target as HTMLInputElement).checked);
    }
</script>
<template>
    <label class="gcf-switch" :class="{ 'active':props.modelValue }">
         <input type="checkbox" class="gcf-switch-checkbox" @change="onChangeHandler" :checked="props.modelValue" />
         <div class="gcf-switch-inner"></div>
         <slot>{{ props.label }}</slot>
    </label>
</template>
<style lang="scss" scoped>
    $bgColor:#c3c3c4;
    $activeBgColor:#2396ef;
    $afterBgColor:#f2f1f3;
    $afterDisableBgColor:#909092;
    @keyframes slideOn {
        0% {
            transform: translateX(0) scale(1);
        }
        50% {
            transform: translateX(20px) scale(1.2);
        }
        100% {
            transform: translateX(40px) scale(1);
        }
    }
    @keyframes slideOff {
        0% {
            transform: translateX(40px) scale(1);
        }
        50% {
            transform: translateX(20px) scale(1.2);
        }
        100% {
            transform: translateX(0) scale(1);
        }
    }
    .#{$baseSelector}switch {
        @extend .el-cursor-pointer,.el-pos-r,.el-display-inline-block;
        @include color($white);
        @include setComponent(font-size,14,px);
        @include setComponent(padding,5,px);
        @include setComponent(width,180,px);
        &-checkbox {
            @extend .el-display-none;
        }
        &-inner {
            @extend .el-cursor-pointer,.el-display-inline-block;
            vertical-align: middle;
            @include setComponent(width,80,px);
            @include setComponent(height,42,px);
            @include setComponent(border-radius,25,px);
            @include setComponent(margin-right,8,px);
            @include background($bgColor);
            &:after {
                animation-timing-function: linear;
                animation-duration: .4s;
                animation-fill-mode: forwards;
                animation-name: slideOff;
                content:"";
                @include setComponent(width,35,px);
                @include setComponent(height,35,px);
                @include setComponent(top,8,px);
                @include setComponent(left,8,px);
                @include background($afterBgColor);
                @include setComponentPercent(border-radius,50);
                @extend .el-cursor-pointer,.el-pos-a;
            }
        }
        &.active {
            .#{$baseSelector}switch-inner {
                @include background($activeBgColor);
                &:after {
                    animation-name:slideOn;
                }
            }
        }
        &.disabled {
            .#{$baseSelector}switch-inner {
                &::after {
                    @include background($afterDisableBgColor);
                }
            }
        }
    }
</style>