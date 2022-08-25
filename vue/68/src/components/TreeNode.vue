<script setup lang="ts">
import { computed, PropType, ref } from 'vue';

const props = defineProps({
    model: Object as PropType<Record<string, any>>
})

const isOpen = ref(true);
const isFolder = computed(() => props.model?.children && props.model?.children.length);
const onToggleHandler = () => isOpen.value = !isOpen.value;
</script>
<template>
    <li class="nmn-nav-list-item">
        <div class="nmn-nav-list-item-node" @click="onToggleHandler">
            <template v-if="model?.href">
                <a :href="model?.href" target="_blank" rel="noopener noreferrer" class="nmn-nav-list-item-node-link">{{ model?.text }}</a>
            </template>
            <template v-else>{{ model?.text }}</template>
        </div>
        <ul class="nmn-nav-list" v-if="isFolder" v-show="isOpen">
            <TreeNode v-for="(model,index) in props.model?.children" :key="model.id + index" :model="model"></TreeNode>
        </ul>
    </li>
</template>
<style lang="scss" scoped>
$linkActiveColor:#11a7ec;
.baseStyle {
    @include setProperty(color,$white);
    @include setProperty(font-size,14px);
    @include setProperty(text-transform,uppercase);
}
.#{$prefix}nav-list-item {
    @include setProperty(margin,10px 0);
    &-node {
        @extend .baseStyle;
        @include setProperty(cursor,pointer);
        &-link {
            @include setProperty(text-decoration,none);
            @extend .baseStyle;
            &:hover {
                @include setProperty(color,$linkActiveColor);
            }
        }
    }
    .#{$prefix}nav-list {
        @include setProperty(padding-left,20px);
        @include setProperty(list-style,none);
    }
}
</style>