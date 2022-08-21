<script lang="ts" setup>
    import { PropType } from 'vue';
    const props = defineProps({
        size:{
            type: Number as PropType<number>,
            default: 40
        }
    })
</script>
<template>
    <svg :width="props.size" :height="props.size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="mini-web-loader">
        <circle cx="12" cy="12" r="10"></circle>
    </svg>
</template>
<style lang="less" scoped>
.@{baseSelector}loader {
    animation: rotate 2s linear infinite;
    color:#2396ef;
    
    & circle {
        animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }

        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }

        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
}
</style>