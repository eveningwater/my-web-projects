<script setup lang="ts">
import { getStyle, scale } from '../utils/util';
import { PropType, ref, watchEffect } from 'vue';
const props = defineProps({
    min: {
        type: Number as PropType<number>,
        default: 0
    },
    max: {
        type: Number as PropType<number>,
        default: 100
    }
});

const inputValue = ref(50);
const left = ref();
const rangeInputRef = ref<HTMLInputElement>();

watchEffect(() => {
    if (inputValue.value && rangeInputRef.value) {
        const label = rangeInputRef.value.nextElementSibling as HTMLLabelElement;
        //get the width
        const rangeWidth = getStyle(rangeInputRef.value, "width"),
            labelWidth = getStyle(label, "width");
        //100px -> 100
        const numWidth = +rangeWidth.slice(0, -2),
            numLabelWidth = +labelWidth.slice(0, -2);
        const min = +rangeInputRef.value.min,
            max = +rangeInputRef.value.max;
        left.value = +inputValue.value * (numWidth / max) - numLabelWidth / 2 + scale(+inputValue.value, min, max, 10, -10);
    }
})
</script>
<template>
    <div class="crs-input">
        <input type="range" class="crs-input-inner" v-model="inputValue" ref="rangeInputRef" :min="props.min"
            :max="props.max" />
        <label class="crs-input-label" :style="{ left: left + 'px' }" v-show="inputValue">{{ inputValue }}</label>
    </div>
</template>
<style scoped lang="scss">
$thumbBgColor: linear-gradient(135deg, #fab879 10%, #ec770a 90%);
$trackBgColor: linear-gradient(135deg, #f3ccac 10%, #f07008 90%);
$labelBgColor: linear-gradient(135deg, #f1b889 10%, #cc5e05 90%);
$labelBoxShadow: 0 0 2px fade-out(rgba(0, 0, 0, .7), .1);
$thumbBorderColor: #f17002;

@mixin baseThumbStyle {
    @include setProperty(width, 25px);
    @include setProperty(height, 25px);
    @include setProperty(-webkit-appearance, none);
    @include setProperty(background, $thumbBgColor);
    @include setProperty(border, 1px solid $thumbBorderColor);
    @include setProperty(margin-top, -6px);
    @include setProperty(border-radius, percentage(.5));
}

@mixin baseTrackStyle {
    @include setProperty(width, percentage(1));
    @include setProperty(height, 13px);
    @include setProperty(cursor, pointer);
    @include setProperty(background, $trackBgColor);
}

.#{$prefix}input {
    @include setProperty(position, relative);
    @include setProperty(border-radius, 4px);

    &-inner {
        @include setProperty(-webkit-appearance, none);
        @include setProperty(max-width, 350px);
        @include setProperty(min-width, 330px);
        @include setProperty(width, percentage(1));
        @include setProperty(margin, 18px 0);

        &+.#{$prefix}input-label {
            @include setProperty(background, $labelBgColor);
            @include setProperty(text-align, center);
            @include setProperty(color, $white);
            @include setProperty(width, 80px);
            @include setProperty(position, absolute);
            @include setProperty(padding, 5px 0);
            @include setProperty(box-shadow, $labelBoxShadow);
            @include setProperty(top, -25px);
            @include setProperty(min-height, 30px);
            @include setProperty(border-radius, 4px);
        }

        &::-webkit-slider-runnable-track {
            @include baseTrackStyle();
        }

        &::-moz-range-track {
            @include baseTrackStyle();
        }

        &:-ms-range-track {
            @include baseTrackStyle();
        }

        &::-webkit-slider-thumb {
            @include baseThumbStyle();
        }

        &::-moz-slider-thumb {
            @include baseThumbStyle();
        }

        &:-ms-slider-thumb {
            @include baseThumbStyle();
        }
    }
}
</style>