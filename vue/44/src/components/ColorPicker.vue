<script setup lang="ts">
    import { nextTick, onMounted, PropType } from '@vue/runtime-core';
    import { ref } from '@vue/reactivity';
    import type OptionType from "ew-color-picker"
    import ewColorPicker from 'ew-color-picker';
    import "ew-color-picker/dist/ew-color-picker.min.css";
    const props = defineProps({
        name:{
            type:String as PropType<string>,
            default:"div"
        },
        option:{
            type:Object as PropType<OptionType>,
            default:() => ({})
        }
    });
    const container = ref(null);
    onMounted(() => {
        nextTick(() => {
            new ewColorPicker({ el:container.value,...props.option });
        })
    })
</script>
<template>
    <component :is="props.name" ref="container"></component>
</template>