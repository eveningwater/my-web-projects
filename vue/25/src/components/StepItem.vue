<script lang="ts" setup>
    const emit = defineEmits(["on-click"]);
    const changeActive = () => {
        emit("on-click");
    }
</script>
<template>
    <div class="ps-step-circle" @click="changeActive">
        <slot></slot>
    </div>
</template>
<style lang="less" scoped>
    @import "../style/variable.less";
    .ps-step-circle {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 12px;
        background-color: @default_color;
        color:@font_color;
        border:4px solid @color;
        transition: all .4s cubic-bezier(0.075, 0.82, 0.165, 1);
        box-sizing: border-box;
        &.active {
            border-color:@color_active;
            color:@color_active;
        }
    }
</style>