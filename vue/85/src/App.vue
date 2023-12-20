<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMemoData, useSetMemoData } from './hooks/useMemoData';
import { useCheckedStore } from './stores/checkedStore';
import ewMessage from 'ew-message';
import localforage from 'localforage';
import { ewConfirm } from './plugins/ewPopbox';
const AsyncHeader = defineAsyncComponent(() => import("./components/Header/Header.vue"));
const AsyncMain = defineAsyncComponent(() => import("./components/Main/Main.vue"));
const AsyncFooter = defineAsyncComponent(() => import("./components/Footer/Footer.vue"));
const mainType = ref<string>('add');
const editData = ref<NoteDataItem>({});
const memoData = ref<NoteDataItem[]>([]);
const searchCacheMemoData = ref<NoteDataItem[]>([])
const showCheckBox = ref(false);
const router = useRouter();
const route = useRoute()
const checkedStore = useCheckedStore();
const getMemoData = async () => {
    const memoStoreData = await useMemoData() || [];
    memoData.value = [...memoStoreData];
    searchCacheMemoData.value = memoData.value;
    const type = await localforage.getItem<string>('mainType');
    if (type) {
        mainType.value = type;
    }
    // 如果当前处于选中待删除状态，刷新页面后重置回未选中待删除状态
    if (type === 'delete') {
        mainType.value = 'add';
    }
}
const onBackHandler = () => {
    mainType.value = 'add';
    localforage.setItem('mainType', mainType.value);
    if (route.name === 'detail') {
        router.push({
            name: 'index'
        })
        showCheckBox.value = false;
        getMemoData();
    }
}
const onHeaderClickHandler = (v: string) => {
    const isCancel = v === 'cancel';
    showCheckBox.value = isCancel;
    mainType.value = isCancel ? 'delete' : 'add';
}
const onFooterClick = async (v: string, isClearEditData: boolean) => {
    if (v === 'editRefresh') {
        mainType.value = 'add';
    }
    if (v !== 'addRefresh') {
        mainType.value = v;
    }
    // 点击新增需要清空编辑数据
    if (isClearEditData) {
        editData.value = {};
    }
    // 新增或者编辑成功后都需要刷新列表
    if (v.toLowerCase().includes('refresh')) {
        getMemoData();
    }
    if (v === 'delete') {
        if (checkedStore.checkedData.length === 0) {
            return ewMessage.warning({
                content: "请选择需要删除的备忘录事项",
                duration: 4000
            })
        }
        ewConfirm({
            title: "温馨提示",
            content: "确定要删除这些备忘录事项吗?",
            showCancel: true,
            sure: async (ctx, e) => {
                e?.stopImmediatePropagation();
                searchCacheMemoData.value = memoData.value = searchCacheMemoData.value.filter(item => !checkedStore.checkedData.includes(item.id!));
                if (memoData.value.length === 0) {
                    mainType.value = 'add';
                }
                await useSetMemoData(memoData.value, false);
                // 删除完成需要清空
                checkedStore.$patch({ checkedData: [] })
                ewMessage.success({
                    content: "删除成功",
                    duration: 4000
                })
                ctx?.close(600);
                setTimeout(() => getMemoData(), 10);
            }
        })
    }
    localforage.setItem('mainType', mainType.value);
}

const onEditHandler = (id: string) => {
    mainType.value = 'save';
    editData.value = memoData.value.find(item => item.id === id) || {};
}

const onDetailHandler = () => {
    mainType.value = 'detail';
    localforage.setItem('mainType', mainType.value);
}

const onSearchHandler = (v: string) => {
    // if (!v) {
    //     return ewMessage.warning({
    //         content: "请输入需要搜素的内容",
    //         duration: 4000
    //     })
    // }
    const searchMemoData = searchCacheMemoData.value.filter(item => item.content?.includes(v) || item.title?.includes(v) || item.classification?.includes(v));
    memoData.value = searchMemoData;
}
onMounted(async () => {
    getMemoData();
})
</script>

<template>
    <async-header :mainType="mainType" @on-back="onBackHandler" :memoData="memoData"
        @on-header-click="onHeaderClickHandler"></async-header>
    <async-main :mainType="mainType" :memo-data="memoData" @on-delete="getMemoData" @on-detail="onDetailHandler"
        @on-edit="onEditHandler" :editData="editData" :showCheckBox="showCheckBox"
        @on-search="onSearchHandler"></async-main>
    <async-footer @on-footer-click="onFooterClick" :mainType="mainType" v-if="mainType !== 'detail'"
        :totalNote="memoData.length" :editData="editData"></async-footer>
</template>
