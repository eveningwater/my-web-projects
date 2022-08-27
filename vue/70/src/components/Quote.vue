<script lang="ts" setup>
import { PropType, toRefs } from 'vue';

const props = defineProps({
    type: {
        type: String as PropType<string>,
        default: 'left',
        validator: (v: string) => {
            return ['left', 'right'].includes(v);
        }
    }
});
const { type } = toRefs(props);
</script>
<template>
    <i class="fas fa-quote tbs-quote" :class="`tbs-quote-${type} fa-quote-${type}`"></i>
</template>
<style lang="scss" scoped>
    $color: fade-out($white,.7);
    .#{$prefix}quote {
        @include setProperty(position,absolute);
        @include setProperty(top,70px);
        @include setProperty(font-size,30px);
        @include setProperty(color,$color);
        &-left {
            @include setProperty(left,40px);
        }
        &-right {
            @include setProperty(right,40px);
        }
    }
</style>