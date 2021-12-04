<script lang="ts" setup>
    import { PropType } from '@vue/runtime-core';
    import { toRefs } from '@vue/reactivity';
    const props = defineProps({
        placeholder:String as PropType<string>,
        nativeType:{
            type:String as PropType<string>,
            default:"text"
        }
    });
    const { placeholder,nativeType } = toRefs(props);
</script>
<template>
    <div class="da-input">
        <input :type="nativeType" :placeholder="placeholder">
    </div>
</template>
<style lang="scss" scoped>
    
</style>