<script lang="ts" setup>
    import { PropType } from '@vue/runtime-core';
    import { toRefs } from '@vue/reactivity';
    const props = defineProps({
        placeholder:String as PropType<string>,
        nativeType:{
            type:String as PropType<string>,
            default:"text"
        },
        modelValue:[String,Number] as PropType<string | number>
    });
    const emit = defineEmits(["update:modelValue","change"]);
    const { placeholder,nativeType,modelValue } = toRefs(props);
    const onInputHandler = (e:Event) => {
        emit("update:modelValue",(e.target as HTMLInputElement).value);
    }
    const onChangeHandler = (e:Event) => emit("change",e);
</script>
<template>
    <div class="da-input">
        <input :type="nativeType" :placeholder="placeholder" @input="onInputHandler" class="da-inner-input" :value="modelValue" @change="onChangeHandler"/>
    </div>
</template>
<style lang="scss" scoped>
    .#{$baseSelector}input {
        @extend .w-100-p;
        @extend .h-40-px;
        @extend .el-vertical-mid;
        .#{$baseSelector}inner-input {
            @extend .common-form-style;
            background-color: $transparent;
            @extend .h-40-px;
            @extend .w-100-p;
            color:$white;
        }
    }
</style>