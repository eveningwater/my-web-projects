<script lang="ts" setup>
import { PropType, toRefs } from 'vue';
const props = defineProps({
    level: {
        type: [Number, String] as PropType<GlobalModule.LevelType>,
        default: '1',
        validator: (v: GlobalModule.LevelType) => {
            return [1, 2, 3, 4, 5, 6].includes(Number(v));
        }
    },
    content: String as PropType<string>
})
const { level, content } = toRefs(props);
const ComponentName = `h${level.value}`;
</script>
<template>
    <Component :is="ComponentName">
        <slot>{{ content }}</slot>
    </Component>
</template>