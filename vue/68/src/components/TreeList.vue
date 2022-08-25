<script setup lang="ts">
import TreeNode from './TreeNode.vue';
import { PropType } from 'vue';

const props = defineProps({
    treeData: {
        type: Array as PropType<Record<string, any>[]>,
        default: () => ([])
    }
})

</script>
<template>
    <ul class="nmn-nav-list">
        <TreeNode v-for="(model, index) in props.treeData" :key="model.id + index" :model="model"></TreeNode>
    </ul>
</template>
<style lang="scss" scoped>
.#{$prefix}nav-list {
    @include setProperty(list-style, none);
}
</style>