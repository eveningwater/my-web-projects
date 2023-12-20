<script setup lang="ts">
import { errorIcon } from '../../const/icon';
import { computed } from 'vue';
const getErrorHTML = computed(() => `
    ${errorIcon('ew-note-error-icon')}
    <p>暂未找到该页面!</p>
    <a href="/"  class="ew-note-error-link">返回首页</a>
`);
</script>
<template>
    <div class="ew-note-error ew-note-flex-center" v-html="getErrorHTML"></div>
</template>