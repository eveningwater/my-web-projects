<template>
    <div class="no-data-container">
        <img :src="noDataUrl" alt="图片加载中" v-if="showImage">
        <p>
            <slot>{{ message }}</slot>
        </p>
    </div>
</template>
<script>
export default {
    name:"noData"
}
</script>
<script setup>
    import { defineProps } from 'vue';
    defineProps({
        noDataUrl:{
            type:String,
            default:""
        },
        showImage:{
            type:Boolean,
            default:true
        },
        message:{
            type:String,
            default:"暂无数据"
        }
    });
</script>
<style scoped>
    .no-data-container {
        width: 100%;
        min-height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .no-data-container > img {
        width: auto;
        height: auto;
        max-width: 250px;
        max-height: 250px;
        display: block;
        border-radius: 5px;
    }
    .no-data-container > p {
        font: normal 18px "微软雅黑";
        color: rgba(79, 151, 233, 0.966);
        letter-spacing: 1px;
        margin-top: 15px;
    }
</style>