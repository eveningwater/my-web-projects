<script setup lang="ts">
    import { nextTick, onMounted, PropType } from '@vue/runtime-core';
    import { ref } from '@vue/reactivity';
    import ewColorPicker from 'ew-color-picker';
    import "ew-color-picker/dist/ew-color-picker.min.css";
    const props = defineProps({
        name:{
            type:String as PropType<string>,
            default:"div"
        },
        option:{
            type:Object as PropType<object>,
            default:() => ({})
        }
    });
    const container = ref(null);
    onMounted(() => {
        nextTick(() => {
            new ewColorPicker({ el:container.value,...props.option }) as any;
        })
    })
</script>
<template>
    <component :is="props.name" ref="container"></component>
</template>