<script setup lang="ts">
import { watch } from 'vue'
import { isObject, isString } from '../../utils/utils';
import { useNoteStore } from '../../stores/noteStore'
import { updateFormKeys } from '../../const/keys';
const props = withDefaults(defineProps<{ editData?: Partial<NoteDataItem> }>(), {
    editData: undefined
});

const noteStore = useNoteStore();
watch(() => props.editData, (val) => {
    if (isObject(val)) {
        updateFormKeys.forEach(key => {
            const value = val![key as keyof NoteDataItem];
            const store = {
                [key]: isString(value) ? value : ''
            }
            noteStore.$patch(store);
        })
    }
}, { immediate: true });

const onChangeForm = (v: Event) => {
    const target = v.target as HTMLElement;
    if (target) {
        const key = target.getAttribute('name') as keyof NoteFormDataItem;
        const value = target.textContent;
        if (key && value) {
            noteStore.$patch({
                [key]: value
            });
        }
    }
}
</script>
<template>
    <div contenteditable="true" class="ew-note-input ew-note-input-title" placeholder="请输入需要记录的事项标题" @input="onChangeForm"
        name="title">
        {{ noteStore.title }}
    </div>
    <div contenteditable="true" class="ew-note-input ew-note-input-class" placeholder="请输入需要记录的事项分类" @input="onChangeForm"
        name="classification">
        {{ noteStore.classification }}
    </div>
    <div contenteditable="true" class="ew-note-textarea ew-note-textarea-content" placeholder="请输入需要记录的事项内容"
        @input="onChangeForm" name="content">
        {{ noteStore.content }}
    </div>
</template>