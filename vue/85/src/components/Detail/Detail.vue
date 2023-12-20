<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute();
const props = withDefaults(defineProps<{ memoData?: NoteDataItem[] }>(), {});
const detailData = computed(() => props.memoData?.find(item => item.id === route.params.uuid) || {});
</script>
<template>
    <div class="ew-note-detail-container">
        <h1 class="ew-note-detail-title">{{ detailData?.title }}</h1>
        <div class="ew-note-detail-classification">{{ detailData?.classification }}</div>
        <div class="ew-note-detail-content">{{ detailData?.content }}</div>
        <div class="ew-note-detail-date">
            <p>创建日期: {{ detailData?.createDate }}</p>
            <p>更新日期: {{ detailData?.updateDate }}</p>
        </div>
    </div>
</template>