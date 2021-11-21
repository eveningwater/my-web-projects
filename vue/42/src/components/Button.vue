<script lang="ts" setup>
    import { PropType } from '@vue/runtime-core';
    type ButtongNativeType = "button" | "reset" | "submit" | undefined;
    const props = defineProps({
        nativeType:{
            type:[String,undefined] as PropType<ButtongNativeType | undefined>,
            default:"button"
        },
        content:String as PropType<string>
    })
</script>
<template>
    <button :type="nativeType">
        <slot>{{ props.content }}</slot>
    </button>
</template>
<style lang="scss" scoped></style>