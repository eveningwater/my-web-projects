<script setup lang="ts">
    import { computed } from '@vue/reactivity';
    const props = defineProps({
        blurValue:{
            type:Number,
            default:0
        }
    });
    const blurStyle = computed(() => `blur(${props.blurValue}px)`);
</script>
<template>
    <div class="bl-background"></div>
</template>
<style lang="less" scoped>
    .bl-background {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: url("https://www.eveningwater.com/my-web-projects/jQuery/15/img/testImg-00.jpg")  no-repeat 50%/cover;
        filter: v-bind(blurStyle);
        transition: all .3s linear;
    }
</style>