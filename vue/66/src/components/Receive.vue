<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    text: String as PropType<string>,
    show: Boolean as PropType<boolean>
})
const emit = defineEmits(['back'])

</script>
<template>
    <div class="fud-receive-container" :class="{ show: props.show }">
        <div class="fud-heart"></div>
        <strong class="fud-title">Thank You!</strong>
        <br>
        <strong class="fud-rate-item-text">
            Feedback:
            <span class="fud-receive-mark-text">{{ props.text }}</span>
        </strong>
        <p class="fud-receive-content">We'll use your feedback to improve our customer support</p>
        <button type="button" class="fud-btn" @click="emit('back')">back Send</button>
    </div>
</template>
<style lang="scss" scoped>
@import '../style/button.scss';
@import '../style/text.scss';
@import '../style/heart.scss';
@import '../style/page.scss';
$markColor: #66d30d;
$contentColor: #989798;

.#{$baseSelector}receive-container {
    @extend .page;
 @include setProperty(transform, rotate(180deg));
     &.show {
        @include setProperty(transform, rotate(0deg));
    }
    .#{$baseSelector}receive-mark-text {
        @include setProperty(color, $markColor);
        @include setProperty(margin-left, 6px);
    }

    .#{$baseSelector}receive-content {
        @include setProperty(line-height, 1.5);
        @include setProperty(margin, 1rem 0);
        @include setProperty(color, $contentColor);
    }
}
</style>