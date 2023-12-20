import { defineStore } from 'pinia'

export const useCheckedStore = defineStore('noteCheckedData', {
    state: () => {
        return {
            checkedData: [] as string[]
        }
    },
})