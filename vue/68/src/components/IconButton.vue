
<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { IconKey, iconMap } from '../utils/const';
const props = defineProps({
    type: {
        type: String as PropType<string>,
        default: 'menu',
        validator: (v: string) => {
            return Object.keys(iconMap).includes(v);
        }
    }
})

const iconType = computed(() => iconMap[props.type as IconKey])
</script>
<template>
    <button type="button" class="nmn-btn">
        <i class="fa" :class="{ ['fa-' + iconType]: true }"></i>
    </button>
</template>
<style lang="scss" scoped>
@import "../style/button.scss";
</style>