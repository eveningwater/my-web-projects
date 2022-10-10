<script lang="ts" setup>
import { PropType, ref, watch } from 'vue';
import useGame from '../core/game';
import { CountDown } from '../utils/util';
import Modal from '../components/Modal.vue';
const count = ref<number>();
const showModal = ref(false);
const modalTitle = ref<string>('温馨提示');
const modalContent = ref<string>();
const modalOkText = ref<string>();
const { materialDataList, onClickHandler, gameConfig, totalMatch,onStartGame,gameStatus } = useGame();
const props = defineProps({
    active: {
        type: Boolean as PropType<boolean>
    }
})
const emit = defineEmits(['on-game-over', 'on-win', 'on-ok']);

watch(() => props.active, (val) => {
    if (val) {
        CountDown(gameConfig.time, 0, 1, 1000, (res) => {
            count.value = res.value;            
            const isWin = () => totalMatch.value === materialDataList.value.length;
            if (res.status === 'end') {
                if (!isWin()) {
                    showModal.value = true;
                    modalContent.value = `游戏已结束!`;
                    modalOkText.value = '重新开始';
                    res.clear?.();
                    emit('on-game-over');
                }
            } else {
                if (isWin()) {
                    showModal.value = true;
                    modalContent.value = `完成游戏共耗时：${gameConfig.time - count.value}s!`;
                    modalOkText.value = '再玩一次';
                    res.clear?.();
                    emit('on-win');
                }
            }
        });
    }
});
const onOkHandler = () => {
    showModal.value = false;
    onStartGame();
    totalMatch.value = 0;
    emit('on-ok');
}
</script>
<template>
    <div class="bm-container bm-clearfix" :class="{ active:props.active }">
        <div class="bm-start-time">{{ count }}</div>
        <ul class="bm-game-list bm-clearfix">
            <li class="bm-game-list-item" v-for="item in materialDataList" :key="item.id"
                :class="{ active: item.active }" @click="() => onClickHandler(item)"
                :style="{ opacity: item.isMatch ? 0 : 1 }">
                <img :src="item.src" :alt="item.title" class="bm-game-list-item-image" />
            </li>
        </ul>
        <slot></slot>
        <Modal v-model="showModal" :title="modalTitle" :content="modalContent" :okText="modalOkText"
            @on-ok="onOkHandler" :maskCloseable="false" :show-cancel="false" />
    </div>
</template>
<style scoped lang="scss">
$boxShadowColor: #eee;
$activeBorderColor: #2f3394;
$bgColor: #1f3092;

.#{$prefix}container {
    @include setProperty(position, relative);
    @include setProperty(padding, 0 .1rem .18rem .1rem);
    @include setProperty(left, percentage(.5));
    @include setProperty(top, percentage(.5));
    @include setProperty(width, 10.9rem);
    @include setProperty(height, auto);
    @include setProperty(border-radius, .2rem);
    @include setProperty(transform, translate(-50%, -50%));
    @include setProperty(text-align, center);
    @include setProperty(user-select, none);
    @include setProperty(z-index, 99);
    @include setProperty(background, $bgColor);

    &.active {
        @include setProperty(animation, bounceIn 1s);
        @include setProperty(box-shadow, 0 0 .1rem .1rem $boxShadowColor);

        @keyframes bounceIn {
            from {
                @include setProperty(opacity, 0);
            }

            to {
                @include setProperty(opacity, 1);
            }
        }
    }

    .#{$prefix}start-time {
        @include setProperty(position, absolute);
        @include setProperty(top, -.4rem);
        @include setProperty(color, $white);
        @include setProperty(right, -.5rem);
        @include setProperty(font-size, .28rem);
    }

    .#{$prefix}game-list {
        @include setProperty(width, percentage(1));
        @include setProperty(height, percentage(1));
        @include setProperty(float, left);
        @include setProperty(display, block);

        &-item {
            @include setProperty(float, left);
            @include setProperty(margin, .18rem 0 0 .1rem);
            @include setProperty(width, 1.67rem);
            @include setProperty(height, .9rem);
            @include setProperty(cursor, pointer);
            @include setProperty(border, .03rem solid $white);

            &:hover {
                @include setProperty(box-shadow, 0 0 .2rem $white);
            }

            &.active {
                @include setProperty(border-color, $activeBorderColor);
            }

            &-image {
                @include setProperty(width, percentage(1));
                @include setProperty(height, percentage(1));
                @include setProperty(display, inline-block);
                @include setProperty(vertical-align, top);
            }
        }
    }

}

@media screen and (max-width: 640px) {
    .#{$prefix}container {
        @include setProperty(width, 6rem);
        @include setProperty(padding-bottom, .3rem);

        .#{$prefix}game-list {
            &-item {
                @include setProperty(width, percentage(.3));
                @include setProperty(margin-left, .15rem);
                @include setProperty(margin-top, .3rem);
            }
        }
    }
}
</style>