import { defineStore } from "pinia";
export const useWordStore = defineStore('word',{
    state:() => ({ word:"" }),
    actions:{
        changeWord(value:string){
            this.word = value;
        }
    }
})