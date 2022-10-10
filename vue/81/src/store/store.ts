import { defineStore } from 'pinia'
import { defaultConfig } from '../core/gameConfig'


export const useConfigStore = defineStore('config',{
    state:() => ({
        gameConfig:{ ...defaultConfig }
    }),
    actions:{
        setGameConfig(config:GlobalModule.GameConfigType) {
            this.gameConfig = config;
        },
        reset(){
            this.$reset();
        }
    }
})