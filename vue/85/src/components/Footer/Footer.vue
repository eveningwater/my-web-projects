<script setup lang="ts">
import { computed } from 'vue';
import { createUUID, formatTime, handleClassName, isEmptyObject } from '../../utils/utils';
import { addIcon, deleteIcon, saveIcon } from '../../const/icon';
import { useNoteStore } from '../../stores/noteStore';
import { useMemoData, useSetMemoData } from '../../hooks/useMemoData';
import ewMessage from 'ew-message';

const props = defineProps({
    mainType: String,
    totalNote: Number,
    editData: Object,
})
const noteStore = useNoteStore();
const emit = defineEmits(['on-footer-click'])
const getFooterBtnClassName = computed(() => props.mainType);
const getFooterIcon = computed(() => {
    if (props.mainType === 'add') {
        return addIcon('ew-note-add-btn-icon')
    } else if (props.mainType === 'delete') {
        return deleteIcon('ew-note-delete-btn-icon');
    } else {
        return saveIcon('ew-note-save-btn-icon')
    }
});
const addMemoData = async () => {
    if (!noteStore.title) {
        return ewMessage.warning({
            content: '请输入需要记录的事项标题',
            duration: 4000
        });
    }
    if (!noteStore.classification) {
        return ewMessage.warning({
            content: '请输入需要记录的事项分类',
            duration: 4000
        });
    }
    if (!noteStore.content) {
        return ewMessage.warning({
            content: '请输入需要记录的事项内容',
            duration: 4000
        });
    }
    let memoStoreData: NoteDataItem[] = [];
    memoStoreData.push({
        id: createUUID(),
        createDate: formatTime(),
        updateDate: '',
        ...noteStore.$state,
    });
    await useSetMemoData(memoStoreData);
    ewMessage.success({
        content: '添加事项成功',
        duration: 2000
    })
    noteStore.clear();
}
const editMemoData = async () => {
    let memoStoreData: Array<NoteDataItem> = await useMemoData();
    memoStoreData = memoStoreData.map(item => {
        if (item.id === props.editData?.id) {
            return { ...props.editData, ...noteStore.$state, updateDate: formatTime() }
        } else {
            return item;
        }
    });
    await useSetMemoData(memoStoreData, false);
    ewMessage.success({
        content: '修改事项成功,2s后将跳转至首页',
        duration: 2000
    })
}
const onFooterClickHandler = async () => {
    if (props.mainType === 'add') {
        emit('on-footer-click', 'save', true);
    }
    if (props.mainType === 'save') {
        const isEdit = !isEmptyObject(props.editData);
        const type = isEdit ? 'editRefresh' : 'addRefresh'
        if (isEdit) {
            await editMemoData();
        } else {
            await addMemoData();
        }
        setTimeout(() => {
            emit('on-footer-click', type);
        }, 2100);
    }
    if (props.mainType === 'delete') {
        emit('on-footer-click', 'delete');
    }
}

</script>
<template>
    <footer class="ew-note-footer ew-note-flex-center">
        <h3 class="ew-note-footer-title">
            <span class="ew-note-footer-title-total">{{ props.totalNote || 0 }}</span>个备忘录
        </h3>
        <button type="button" :class="handleClassName(`ew-note-${getFooterBtnClassName}-btn`)" class="ew-note-btn"
            v-html="getFooterIcon" @click="onFooterClickHandler">
        </button>
    </footer>
</template>