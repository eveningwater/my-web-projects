<script lang="ts" setup>
    import { PropType } from '@vue/runtime-core';
    import { toRefs } from "@vue/reactivity";
    type ButtonType = "submit" | "reset" | "button" | undefined;
    const props = defineProps({
        nativeType:[String,undefined] as PropType<ButtonType>,
        content:String as PropType<string>
    });
    const { nativeType,content } = toRefs(props);
</script>
<template>
    <button :type="nativeType" class="da-btn">
        <slot>{{ content }}</slot>
    </button>
</template>
<style lang="scss" scoped>
    @import "../style/btn.scss";
</style>