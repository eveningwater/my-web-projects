<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
    content: String as PropType<string>
})
</script>
<template>
    <p class="tbs-content">
        <slot>{{ props.content}}</slot>
    </p>
</template>
<style lang="scss" scoped>
.#{$prefix}content {
    @include setProperty(margin, 1.2rem 0);
    @include setProperty(text-align, justify);
    @include setProperty(line-height, 28px);
}
</style>