<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { keys } from './router/import';
const tabList = ref<{ label:string,name:string } []>(keys.map((key: string) => ({ label:key,name:key })));
const activeName = ref('BasicTable');
const router = useRouter()
const route = useRoute()
const handleClick = (tab: Record<string,unknown>) => {
  router.push('/' + tab.paneName)
}
watch(() => route, (val) => {
  activeName.value = val.path.slice(1) || 'BasicTable'
}, { deep: true, immediate: true, })
</script>

<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="(item, index) in tabList" :key="item.name + index" :label="item.label" :name="item.name">
    </el-tab-pane>
  </el-tabs>
  <router-view></router-view>
</template>

<style>
</style>
