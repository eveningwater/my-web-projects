<script setup lang="ts">
import { PropType } from 'vue';
import Head from './Head.vue';
const props = defineProps({
    modelValue: Boolean as PropType<boolean>
});
const emit = defineEmits(['update:modelValue']);
emit('update:modelValue');
</script>
<template>
    <Head class="bm-go" :class="{ 'active':props.modelValue }">Go</Head>
</template>
<style scoped lang="scss">
@import "../style/head.scss";

.#{$prefix}go {
    @include head();
    opacity: 0;
    transform: scale(0);

    &.active {
        animation: goSlide 1.5s .5s;
    }

    @keyframes goSlide {
        from {
            opacity: 0;
            transform: scale(0);
        }

        to {
            transform: scale(1.7);
            opacity: 1;
        }
    }
}
</style>