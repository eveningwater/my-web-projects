<script lang="ts" setup>
import { PropType } from 'vue';
const props = defineProps({
    type: {
        type: String as PropType<string>,
        default: "text"
    },
    placeHolder: String as PropType<string>
});
const emit = defineEmits([
    "on-keydown"
]);
const onKeydownHandler = (e: KeyboardEvent) => emit("on-keydown", e);
</script>
<template>
    <div class="gp-input">
        <input :type="props.type" class="gp-inner-input" :placeholder="placeHolder" @keydown="onKeydownHandler" />
    </div>
</template>
<style lang="scss" scoped>
$borderColor:#ef9023;
$borderFocusColor:#f58403;
$boxShadowColor:#91cbf1;

.#{$baseSelector}input {
    @extend .el-pos-r;
    @include setComponentPercent(width, 100);

    .#{$baseSelector}inner-input {
        border: 1px solid $borderColor;
        @include background($transparent);
        @include setComponentPercent(width, 100);
        @include setComponent(border-radius, 6, px);
        @include setComponent(font-size, 18, px);
        @include setComponent(padding-top, 1, rem);
        @include setComponent(padding-bottom, 1, rem);
        @include setComponent(padding-left, 2, rem);
        @include setComponent(padding-right, 2, rem);
        @extend .el-display-inline-block;
        @include color();

        &:focus-visible {
            outline: none;
        }
        &:focus {
            border-color:$borderFocusColor;
            box-shadow: 0 0 6px $boxShadowColor;
        }
        &::-webkit-input-placeholder {
            @include color();
            @include setComponent(font-size, 18, px);
            @include setComponent(letter-spacing, 2, px);
        }

        &::-moz-input-placeholder {
            @include color();
            @include setComponent(font-size, 18, px);
            @include setComponent(letter-spacing, 2, px);
        }

        &::-ms-input-placeholder {
            @include color();
            @include setComponent(font-size, 18, px);
            @include setComponent(letter-spacing, 2, px);
        }
    }
}
</style>