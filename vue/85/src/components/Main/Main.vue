<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import { $, toTop } from '../../utils/utils';
const AsyncForm = defineAsyncComponent(() => import("../Form/Form.vue"));
const AsyncSearch = defineAsyncComponent(() => import("../Search/Search.vue"));
const props = withDefaults(defineProps<{ mainType: string, memoData?: NoteDataItem[], editData?: NoteDataItem, showCheckBox: boolean }>(), {
    mainType: '',
    showCheckBox: false
})

onMounted(() => {
    const topElement = $('.ew-note-to-top') as HTMLDivElement;
    const mainElement = $('.ew-note-main') as HTMLElement;
    if (topElement) {
        toTop(topElement, mainElement)
    }
})
</script>

<template>
    <main class="ew-note-main">
        <async-form v-if="['save', 'edit'].includes(props.mainType)" :editData="props.editData"></async-form>
        <async-search @on-search="$emit('on-search', $event)"
            v-if="['add', 'delete'].includes(props.mainType)"></async-search>
        <router-view :memoData="props.memoData" :mainType="props.mainType" @on-detail="$emit('on-detail')"
            @on-delete="$emit('on-delete')" @on-edit="(id: string) => $emit('on-edit', id)" :showCheckBox="showCheckBox"
            v-if="props.mainType !== 'save'"></router-view>
        <div class="ew-note-to-top"></div>
    </main>
</template>

