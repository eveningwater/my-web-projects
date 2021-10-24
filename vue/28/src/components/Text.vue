<script setup lang="ts">
    const props = defineProps({
        number:{
            type:Number,
            default:0
        },
        count:{
            type:Number,
            default:0
        }
    });
</script>
<template>
    <p class="bl-text">页面加载{{ props.count }}%</p>
</template>
<style lang="less" scoped>
    @import "../style/variable.less";
    .bl-text {
        position: absolute;
        color:@color;
        font-size: 2rem;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        opacity: v-bind("props.number");
        transition: all .3s linear;
    }
</style>