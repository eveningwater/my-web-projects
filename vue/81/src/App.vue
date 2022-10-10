<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted,ref } from 'vue';
import Snow from './utils/snow';
import Button from './components/Button.vue';
import Go from './components/Go.vue';
import Ready from './components/Ready.vue';
import bgMusic from '@/assets/audio/bgMusic.mp3';
import readyMusic from '@/assets/audio/go.mp3';
import rightMusic from '@/assets/audio/right.mp3';
import wrongMusic from '@/assets/audio/wrong.mp3';
import loseMusic from '@/assets/audio/lose.mp3';
import winMusic from '@/assets/audio/win.mp3';
import Container from './views/Container.vue';
import { useConfigStore } from './store/store';
import useGame from './core/game';

const { setGameConfig,gameConfig } = useConfigStore();
const { gameStatus } = useGame();

const snow = ref<HTMLDivElement>();
const countShow = ref(false);
const bgAudio = ref<HTMLAudioElement>();
const readyAudio = ref<HTMLAudioElement>();
const loseAudio = ref<HTMLAudioElement>();
const winAudio = ref<HTMLAudioElement>();
const onStart = () => {
    countShow.value = true;
    readyAudio.value?.play();
    bgAudio.value?.play();
    bgAudio.value?.setAttribute('loop','loop');
    setTimeout(() => {
        setGameConfig({
            ...gameConfig,
            gameStatus: 1
        })
        gameStatus.value = 1;
    },1800);
}
const onStopMusic = () => {
    bgAudio.value?.pause();
}
const onGameOver = () => {
    onStopMusic();
    loseAudio.value?.play();
}
const onWin = () => {
    onStopMusic();
    winAudio.value?.play();
}
const onOkHandler = () => {
    countShow.value = false;
    gameStatus.value = 0;
}


onMounted(() => {
    if(snow.value){
        const s = new Snow(snow.value!);
        s.init();
    }
});
</script>

<template>
    <div ref="snow" class="bm-snow"></div>
    <audio :src="bgMusic" ref="bgAudio"></audio>
    <audio :src="readyMusic" ref="readyAudio"></audio>
    <audio :src="rightMusic" id="rightAudio"></audio>
    <audio :src="wrongMusic" id="wrongAudio"></audio>
    <audio :src="loseMusic" ref="loseAudio"></audio>
    <audio :src="winMusic" ref="winAudio"></audio>
    <Ready v-model="countShow" v-show="countShow"></Ready>
    <Go v-model="countShow" v-show="countShow"/>
    <Button @click="onStart" :style="{ display: countShow ? 'none' : 'block'}"></Button>
    <Container 
        v-show="gameStatus === 1"
        :active="gameStatus === 1" 
        @on-game-over="onGameOver" 
        @on-win="onWin" 
        @on-ok="onOkHandler"
    ></Container>
</template>

<style scoped lang="scss">
.#{$prefix}snow {
    @include setProperty(width,percentage(1));
    @include setProperty(height,percentage(1));
    @include setProperty(position,absolute);
    @include setProperty(z-index,0);
}
</style>
