<script setup lang="ts">
import { backIcon, cancelIcon, editIcon } from '../../const/icon';
import { handleClassName } from '../../utils/utils'
import { ref, computed, watch } from 'vue';
const props = defineProps({
    mainType: String,
    memoData: Array
});
const emit = defineEmits(['on-back', 'on-header-click'])
const headerIconType = ref('');
const getHeaderIcon = computed(() => {
    if (headerIconType.value === 'edit') {
        return editIcon('ew-note-edit-btn-icon');
    } else if (headerIconType.value === 'cancel') {
        return cancelIcon('ew-note-cancel-btn-icon')
    } else {
        return '';
    }
})

const onBackHandler = () => {
    emit('on-back');
}

const onHeaderClick = () => {
    const val = headerIconType.value;
    if (val === '') {
        return;
    }
    headerIconType.value = val === 'edit' ? 'cancel' : 'edit';
    emit('on-header-click', headerIconType.value);
}

watch([() => props.mainType, () => props.memoData], (val) => {
    const [mainType, memoData] = val;
    const noData = Array.isArray(memoData) && memoData.length;
    if (mainType === 'add' && noData) {
        headerIconType.value = 'edit';
    } else if (!noData || (mainType !== 'add' && mainType !== 'delete')) {
        headerIconType.value = '';
    }
}, { immediate: true })
</script>
<template>
    <header class="ew-note-header ew-note-flex-center">
        <button type="button" class="ew-note-btn ew-note-back-btn" v-html="backIcon('ew-note-back-btn-icon')"
            v-if="['save', 'detail'].includes(props.mainType!)" @click="onBackHandler"></button>
        <h3 class="ew-note-header-title">备忘录</h3>
        <button type="button" :class="handleClassName(`ew-note-${headerIconType === 'edit' ? 'edit' : 'cancel'}-btn`)"
            class="ew-note-btn" v-html="getHeaderIcon" v-if="headerIconType" @click="onHeaderClick"></button>
    </header>
</template>