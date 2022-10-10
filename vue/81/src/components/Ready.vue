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
    <Head class="bm-ready" :class="{ 'active':props.modelValue }">Ready</Head>
</template>
<style scoped lang="scss">
    @import "../style/head.scss";
    .#{$prefix}ready {
        @include head();
        transform: translateY(-150%);
        &.active {
            animation: readySlide 1.5s;
        }
        @keyframes readySlide {
            from {
                opacity: 1;
                transform: translateY(-150%);
            }
            to {
                transform: translateY(0);
                opacity: 0;
            }
        }
    }
</style>