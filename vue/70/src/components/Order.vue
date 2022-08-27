<script lang="ts" setup>
import { PropType, toRefs } from 'vue';
const props = defineProps({
    count: Number as PropType<number>
});
const { count } = toRefs(props);

</script>
<template>
    <div class="tbs-order">
        The order:
        <span class="tbs-order-count">{{ count }}</span>
    </div>
</template>
<style lang="scss" scoped>
$color: #663202;

.#{$prefix}order {
    @extend .flex-center;

    &-count {
        @include setProperty(color, $color);
        @include setProperty(margin-left, 15px);
        @include setProperty(font-size, 25px);
    }
}
</style>