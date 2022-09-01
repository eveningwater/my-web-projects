<script lang="ts" setup>
import { computed, defineAsyncComponent, PropType, ref, toRefs } from 'vue';
import { globalData, GlobalDataKey, IMAGE_URL } from '../utils/const';
import { filterZero, getRandomLocation } from '../utils/util';
type InsectDataItem = { x: number, y: number, rotate: number };
const AsyncScreen = defineAsyncComponent(() => import('@/components/Screen.vue'));
const AsyncTitle = defineAsyncComponent(() => import('@/components/Title.vue'));
const AsyncModal = defineAsyncComponent(() => import('@/components/Modal.vue'));
const props = defineProps({
    lang: String as PropType<GlobalDataKey>,
    insect: String as PropType<string>
});
const emit = defineEmits(['on-restart'])
const { lang, insect } = toRefs(props);
const showModal = ref(false);
const insectList = ref<InsectDataItem[]>([]);
const time = ref('');
const score = ref(0);
const currentCaught = ref<number>();
let timer: ReturnType<typeof setTimeout> | null = null;
let seconds: number = 0;
const data = computed(() => globalData[lang?.value as GlobalDataKey]);
const modalContent = computed(() => data.value.message.split("?").map((item, index) => (index === 0 ? item + "?<br />" : item)).join(""))
const createInsect = () => {
    const { x, y } = getRandomLocation();
    insectList.value.push({
        x,
        y,
        rotate: Math.random() * 360
    });
}
const continueCreateInsect = () => {
    if (!insect || !insect?.value) {
        return;
    }
    setTimeout(() => createInsect(), 1500);
    setTimeout(() => createInsect(), 2000);
}
const increaseTime = () => {
    seconds++;
    const m = Math.floor(seconds / 60),
        s = seconds % 60;
    time.value = `${filterZero(m)}:${filterZero(s)}`;
}
const increaseScore = () => {
    score.value++;
    if (score.value >= 20) {
        if (timer) {
            clearTimeout(timer as ReturnType<typeof setTimeout>);
        }
        showModal.value = true;
    }
}
const startGame = () => {
    increaseTime();
    timer = setTimeout(startGame, 1000);
}
const onRestartHandler = () => {
    score.value = 0;
    if(timer){
        clearTimeout(timer)
    }
    time.value = '00:00';
    showModal.value = false;
    currentCaught.value = void 0;
    insectList.value = [];
    emit('on-restart');
}
const onContinueHandler = () => {
    showModal.value = false;
    startGame();
}
const onCatchInsect = (index: number) => {
    if (showModal.value) {
        return;
    }
    increaseScore();
    currentCaught.value = index;
    insectList.value.splice(index, 1);
    currentCaught.value = void 0;
    continueCreateInsect();
}
defineExpose({
    createInsect,
    startGame
});
</script>
<template>
    <async-screen>
        <async-title level="3" class="icg-screen-time">
            {{ data.countTime }}
            <span class="icg-screen-time-text">{{ time }}</span>
        </async-title>
        <async-title level="3" class="icg-screen-score">
            {{ data.score }}
            <span class="icg-screen-score-text">{{ score }}</span>
        </async-title>
        <template v-if="props.insect">
            <div class="icg-screen-insect" v-for="(item, index) in insectList" :key="`${item.x}-${index + 1}`"
                :class="{ caught: currentCaught === index }" @click="onCatchInsect(index)"
                :style="{ left: item.x + 'px', top: item.y + 'px' }">
                <img :src="IMAGE_URL + insect + '.png'" :alt="insect" class="icg-screen-insect-img"
                    :style="{ transform: `rotate(${item.rotate})` }" />
            </div>
        </template>
        <async-modal v-model="showModal" :title="data.title" :content="modalContent" :okText="data.restartPlayText"
            :cancelText="data.continueText" align="center" @on-ok="onRestartHandler" @on-cancel="onContinueHandler"
            isRenderContentHTML :maskCloseable="false">
        </async-modal>
    </async-screen>
</template>
<style scoped lang="scss">
$timeColor: #ec0909;

.#{$prefix}screen-time,
.#{$prefix}screen-score {
    @include setProperty(position, absolute);
    @include setProperty(font-size, 14px);
    @include setProperty(top, 15px);

    &-text {
        @include setProperty(vertical-align, text-top);
        @include setProperty(margin-left, 5px);
        @include setProperty(display, inline-block);
        @include setProperty(font-size, 16px);
        @include setProperty(color, $timeColor);
    }
}

.#{$prefix}screen-time {
    @include setProperty(left, 15px);
}

.#{$prefix}screen-score {
    @include setProperty(right, 15px);
}

.#{$prefix}screen-insect {
    @extend .flex-center;
    @include setProperty(width, 100px);
    @include setProperty(height, 100px);
    @include setProperty(cursor, pointer);
    @include setProperty(position, absolute);
    @include setProperty(transform, translate(-50%, -50%) scale(1));
    @include setProperty(transition, transform .4s cubic-bezier(.175, .885, .32, 1.275));

    &.caught {
        @include setProperty(transform, translate(-50%, -50%) scale(0));
    }

    &-img {
        @include setProperty(width, 100px);
        @include setProperty(height, 100px);
        @include setProperty(object-fit, contain);
    }
}
</style>