<script setup lang="ts">
import { ref, computed } from 'vue';
import { searchIcon } from '../../const/icon';

const emit = defineEmits(['on-search']);
const searchValue = ref('');
const getSearchIcon = computed(() => searchIcon('ew-note-search-icon'));
const onSearchHandler = () => {
    emit('on-search', searchValue.value);
}
</script>
<template>
    <div class="ew-note-search">
        <input type="text" v-model="searchValue" placeholder="请输入您需要搜索的备忘录事项" class="ew-note-search-input"
            @keydown.enter="$emit('on-search', searchValue)" />
        <span v-html="getSearchIcon" class="ew-note-search-icon-container" @click="onSearchHandler"></span>
    </div>
</template>
<style scoped>
.ew-note-search {
    display: flex;
    align-items: center;
    position: relative;
}

.ew-note-search-input {
    border-radius: 6px;
    padding: 8px 12px;
    width: 100%;
    display: inline-block;
    outline: none;
    border: 1px solid var(--search-border-color--);
    color: var(--search-color--);
}

.ew-note-search-input:focus {
    border-color: var(--search-focus-color--);
}

.ew-note-search-icon-container {
    position: absolute;
    right: 4px;
    display: flex;
    align-items: center;
}
</style>