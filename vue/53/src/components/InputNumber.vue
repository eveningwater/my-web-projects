<script setup lang="ts">
    import { PropType } from 'vue';
    const props = defineProps({
        modelValue:{
            type:[Number,String] as PropType<number | string>,
            default:1
        },
        min:{
            type:Number as PropType<number>,
            default:1
        },
        max:{
            type:Number as PropType<number>,
            default:10
        }
    });
    const emit = defineEmits(["update:modelValue","on-change"]);
</script>
<template>
    <div class="ate-speed">
        <slot>speed:</slot>
        <input 
            type="number" 
            :min="props.min" 
            :max="props.max" 
            class="ate-speed-input" 
            @input="emit('update:modelValue',($event?.target as HTMLInputElement).value)"
            @change="emit('on-change',$event)" 
            :value="props.modelValue" 
        />
    </div>
</template>
<style lang="scss" scoped>
    $inputBorderColor:fade-in(rgba(255,255,245,.8),.1);
    .#{$baseSelector}speed {
        @include background($speedBgColor);
        @include color($white);
        @include setComponent(max-width,280,px);
        @include setComponent(height,60,px);
        @include setComponent(padding-top,10,px);
        @include setComponent(padding-bottom,10,px);
        @include setComponent(padding-left,25,px);
        @include setComponent(padding-right,25,px);
        @include setComponent(border-radius,8,px);
        @include setComponent(bottom,10,px);
        @include setComponentPercent(left,50);
        transform: translateX(-50%);
        @extend .el-pos-f,.el-display-flex,.el-jc-center,.el-ai-center;
        &-input {
            @include setComponent(border-radius,10,px);
            @include setComponent(margin-left,0.2,rem);
            @include setComponent(padding-top,.6,rem);
            @include setComponent(padding-bottom,.6,rem);
            @include setComponent(padding-left,.8,rem);
            @include setComponent(padding-right,.8,rem);
            border: {
                style:solid;
                width:1px;
                color:$inputBorderColor;
            }
            &:focus-visible {
                outline:none;
            }
        }
    }
</style>