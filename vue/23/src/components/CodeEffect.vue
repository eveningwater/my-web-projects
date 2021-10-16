<template>
    <div class="tri-code-effect">
        <div class="tri-element" :style="state.style"></div>
    </div>
</template>
<script lang="ts" setup>
    import { getTriangleStyle } from "../utils/util";
    import { defineProps,reactive,watch } from '@vue/runtime-core';
    const props = defineProps({
        formData:{
            type:Object,
            default:() => ({
                width:60,
                height:60,
                direction:"top",
                color:"#2396ef",
                rotate:0
            })
        }
    });
    
    const state = reactive({
        style:{}
    });
    watch(() => props.formData,(val) => {
        const { direction,color,width,height,rotate } = val;
        state.style = { ...getTriangleStyle(direction,width,height,color),transform:`rotate(${rotate}deg)`};
    },{ deep:true,immediate:true })
</script>
<style lang="less" scoped>
    .tri-code-effect{
        min-width: 300px;
        height: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(45deg,rgba(0,0,0,.2) 25%,transparent 0,transparent 75%,rgba(0,0,0,.2) 0),
                    linear-gradient(45deg,rgba(0,0,0,.2) 25%,transparent 0,transparent 75%,rgba(0,0,0,.2) 0);
        background-size: 30px 30px;
        background-position: 0 0,15px 15px;
        .tri-element {
            display: inline-block;
            border-style: solid;
            width: 0;
            height: 0;
            transition: all .3s;
        }
    }
</style>
