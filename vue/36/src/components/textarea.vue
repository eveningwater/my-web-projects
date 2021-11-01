<script lang="ts" setup>
    import { watch } from '@vue/runtime-core';
    import { ref } from 'vue';
    interface PropsType {
        placeholder:string;
    }
    const props = withDefaults(defineProps<PropsType>(),{
        placeholder:""
    });
    const emit = defineEmits(["update:value","on-down"]);
    const value = ref("");
    watch(value,(val) => {
        emit("update:value",val);
    });
    const onKeyDownHandler = (e:KeyboardEvent) => {
        if(e.keyCode === 13){
            emit("on-down");
        }
    }
</script>
<template>
    <textarea class="rcp-textarea" :placeholder="props.placeholder" v-model="value" @keydown="onKeyDownHandler"></textarea>
</template>
<style lang="less" scoped>
    @import "../style/variable.less";
    .@{baseSelector}textarea {
        width: percentage(@full);
        border-radius: unit(3 * 4,px);
        max-width: unit(pow(10,2) * (pow(4,3) - pow(4,1)) * 0.1,px);
        border:unit(@full,px) solid @randomBorderColor;
        background: linear-gradient(@rotate,@randomBgColor-1 percentage(floor(0.18)),@randomBgColor-2 percentage(ceil(0.88)));
        height: unit(pow(2,3),rem);
        resize: extract(@display,length(@display));
        display: extract(@display,@full + @full);
        color:@color;
        font-size: unit(pow(4,2) + pow(2,1),px);
        box-sizing: border-box;
        .p(n,15,px);
        &:focus-visible {
            outline: extract(@display,length(@display));
        }
        &::-webkit-input-placeholder {
            color:@color;
            font-size: unit(pow(4,2) + pow(2,1),px);
        }
    }
</style>