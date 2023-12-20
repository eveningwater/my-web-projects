<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';
import { arrowRightIcon, deleteIcon, editIcon, emptyDataIcon } from '../../const/icon';
import { ewConfirm } from '../../plugins/ewPopbox';
import { useMemoData, useSetMemoData } from '../../hooks/useMemoData';
import { useRouter } from 'vue-router';
import { useCheckedStore } from '../../stores/checkedStore';
const checkedStore = useCheckedStore();
const AsyncCheckBox = defineAsyncComponent(() => import("../CheckBox/CheckBox.vue"));
const router = useRouter();
const emit = defineEmits(['on-delete', 'on-detail', 'on-edit']);
const props = withDefaults(defineProps<{ memoData?: NoteDataItem[], mainType: string, showCheckBox: boolean }>(), {
    mainType: 'add',
    showCheckBox: false
});
const handleBtnIcon = computed(() => `
${deleteIcon('ew-note-main-content-list-item-delete-icon')}
${editIcon('ew-note-main-content-list-item-edit-icon')}
${arrowRightIcon('ew-note-main-content-list-item-right-icon')}
`);

const noEmptyData = computed(() => `
${emptyDataIcon('ew-note-main-no-data-icon')}
<p class="ew-note-main-no-data-text">暂无数据</p>
`);

const checkedData = ref<string[]>([])
const onChangeHandler = (e: boolean, v: string) => {
    if (e) {
        checkedData.value.push(v);
    } else {
        checkedData.value = checkedData.value.filter(item => item !== v);
    }
    checkedStore.$patch({ checkedData: checkedData.value })
}
const toDetailHandler = (data: NoteDataItem) => {
    router.push({
        name: 'detail',
        params: {
            uuid: data.id
        }
    });
    emit('on-detail')
}
const onClickHandler = (e: Event, data: NoteDataItem) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (target) {
        const newTarget = target.tagName.toLowerCase() === 'path' ? target?.parentElement : target;
        const classNames = (newTarget as unknown as SVGElement).classList;
        if (classNames.contains('ew-note-main-content-list-item-delete-icon')) {
            ewConfirm({
                title: "温馨提示",
                content: "确定要删除该数据吗?",
                showCancel: true,
                sure: async (ctx) => {
                    let memoStoreData: Array<NoteDataItem> = await useMemoData();
                    const memoNewStoreData = memoStoreData.filter(item => item.id !== data.id);
                    await useSetMemoData(memoNewStoreData, false);
                    ctx?.close(600);
                    emit('on-delete')
                }
            })
        } else if (classNames.contains('ew-note-main-content-list-item-edit-icon')) {
            emit('on-edit', data.id)
        } else {
            toDetailHandler(data);
        }
    }
}
const onGoToDetail = (e: Event, data: NoteDataItem) => {
    e.stopPropagation();
    toDetailHandler(data);
}
</script>
<template>
    <ul class="ew-note-main-content-list">
        <li class="ew-note-main-content-list-item" v-for="data in (props.memoData || [])" :key="data.id">
            <async-check-box @on-change="onChangeHandler($event, data.id!)" v-if="showCheckBox"></async-check-box>
            <a href="javascript:void 0;" :data-url="`/detail?uuid=${data.id}`" class="ew-note-main-content-list-item-link"
                rel="noopener noreferrer" @click="onGoToDetail($event, data)">
                <p class="ew-note-main-content-list-item-title">{{ data.title }}</p>
                <p class="ew-note-main-content-list-item-date">
                    <span class="ew-note-main-content-list-item-create-date">创建日期:{{ data.createDate }}</span>
                    <span class="ew-note-main-content-list-item-update-date">更新日期:{{ data.updateDate }}</span>
                </p>
                <div class="ew-note-main-content-list-item-btn-group" v-html="handleBtnIcon"
                    @click="onClickHandler($event, data)"></div>
            </a>
        </li>
    </ul>
    <div class="ew-note-main-no-data-container ew-note-flex-center" v-html="noEmptyData"
        v-if="!props.memoData?.length && props.mainType === 'add'"></div>
</template>