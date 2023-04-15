<script setup lang="ts">
import { ElButton, ElRow, ElCol } from 'element-plus'
import { requestUrl } from './axios/url'
import { get } from './axios';
import { ref } from 'vue';
type ResData = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}
const res = ref<ResData>({ userId: 1, id: 1, title: "默认标题", completed: false })
const onRequest = () => {
    get(requestUrl).then(data => {
        res.value = data as ResData;
    })
}
</script>

<template>
    <div class="page">
        <el-row :gutter="20">
            <el-col :span="4">用户id:</el-col>
            <el-col :span="20">{{ res.userId }}</el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">id:</el-col>
            <el-col :span="20">{{ res.id }}</el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">标题:</el-col>
            <el-col :span="20">{{ res.title }}</el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">是否完成:</el-col>
            <el-col :span="20">{{ res.completed ? '是' : '否' }}</el-col>
        </el-row>
        <el-button @click="onRequest">请求数据</el-button>
    </div>
</template>

<style scoped></style>
