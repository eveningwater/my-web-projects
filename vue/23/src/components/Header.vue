<template>
   <header class="tri-header">
       <Title level="2" class="tri-title">趣谈前端|在线三角形生成器</Title>
       <slot></slot>
   </header>
</template>

<script setup>
import Title from "./Title.vue";
</script>

<style lang="less">
    .tri-header {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #535455;
    }
</style>