<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { createUUID, getNotesData, setNotesData } from './utils/util';
import type { DataType } from "./utils/dataType";
const AsyncButton = defineAsyncComponent(() => import("@/components/Button.vue"));
const AsyncCard = defineAsyncComponent(() => import("@/components/Card.vue"));
const cardList = ref<Array<DataType>>([]);
onMounted(() => {
    const notesData = getNotesData() || [];
    if(Array.isArray(notesData) && notesData.length){
        cardList.value = [...notesData];
    }
});
const onAddNoteHandler = () => {
    cardList.value.push({
       uuid:createUUID(),
       content:"",
       isEdit:false
    });
}
const onUpdateDataHandler = () => setNotesData("notes",cardList.value);
const onDeleteDataHandler = (uuid:string) => {
    const idx = cardList.value.findIndex((item:DataType) => item.uuid === uuid);
    if(idx > -1){
        cardList.value.splice(idx,1);
    }
    setNotesData("notes",cardList.value);
}
</script>

<template>
    <header class="na-header">
        <async-button className="na-header-add-btn" @click="onAddNoteHandler"><i class="fas fa-plus na-header-add-btn-icon"></i>add notes</async-button>
    </header>
    <div class="na-note-container">
        <async-card v-for="(item,index) in cardList" :key="item.uuid + index" :item="item" @on-update-data="onUpdateDataHandler" @on-delete-data="onDeleteDataHandler"></async-card>
    </div>
</template>

<style lang="scss">
  @import "./style/app.scss";
</style>
