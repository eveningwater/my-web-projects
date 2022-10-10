import { createUUID } from './../utils/util';
import { useConfigStore } from './../store/store';
import _ from 'lodash';
import { onMounted, ref } from 'vue';

const useGame = () => {
    const { gameConfig } = useConfigStore();
    const materialDataList = ref<GlobalModule.MaterialData[]>([]);
    const activeDataList = ref<GlobalModule.MaterialData[]>([]);

    const rightAudio = ref<HTMLAudioElement>();
    const wrongAudio = ref<HTMLAudioElement>();

    const totalMatch = ref(0);

    const gameStatus = ref(gameConfig.gameStatus);

    const findRepeatItem = function (arr: GlobalModule.MaterialData[]) {
        const unique = new Set();
        for (const item of arr) {
            if (unique.has(item.src)) {
                return true;
            }
            unique.add(item.src);
        }
        return false;
    };

    const onStartGame = () => {
        materialDataList.value = _.shuffle(_.flatten(_.times(2, _.constant(gameConfig.materialList.map(item => ({
            src: item.src,
            title: item.title,
            active: false,
            isMatch: false
        })))))).map(item => ({
            id: createUUID(),
            ...item
        }));
    }

    const onClickHandler = (block: GlobalModule.MaterialData) => {
        block.active = true;
        if (activeDataList.value.findIndex(item => item.id === block.id) > -1) {
            return;
        }
        activeDataList.value.push(block);
        if(!rightAudio.value){
            rightAudio.value = document.getElementById('rightAudio') as HTMLAudioElement;
        }
        if(!wrongAudio.value){
            wrongAudio.value = document.getElementById('wrongAudio') as HTMLAudioElement;
        }

        if (findRepeatItem(activeDataList.value)) {
            materialDataList.value = materialDataList.value.map(item => {
                const index = activeDataList.value.findIndex(active => active.id === item.id);
                if (index > -1) {
                    item.isMatch = true;
                    activeDataList.value.splice(index, 1);
                }
                return item;
            });
            totalMatch.value += 2;
            rightAudio.value?.play();
            wrongAudio.value?.pause();
        } else {
            if (activeDataList.value.length !== 2) {
                return;
            }
            activeDataList.value = [];
            materialDataList.value = materialDataList.value.map(item => ({
                ...item,
                active: false
            }));
            rightAudio.value?.pause();
            wrongAudio.value?.play();
        }
    }

    onMounted(() => {
        onStartGame();
    })

    return {
        materialDataList,
        gameConfig,
        gameStatus,
        totalMatch,
        onClickHandler,
        onStartGame
    }
}

export default useGame;