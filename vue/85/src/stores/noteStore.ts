import { defineStore } from 'pinia'
import { updateFormKeys } from '../const/keys';

export const useNoteStore = defineStore('noteFormData', {
    state: () => {
        return {
            title: '',
            classification: '',
            content: '',
        }
    },
    actions: {
        clear() {
            updateFormKeys.forEach(key => {
                this[key as keyof NoteFormDataItem] = '';
            })
        }
    },
})