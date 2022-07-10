<script lang="ts" setup>
import { onMounted, PropType, ref } from 'vue';
const props = defineProps({
    count:{
        type: Number as PropType<number>,
        default:10
    }
})
const numList = ref<{ text: string; className: string }[]>([])
const emit = defineEmits(['on-animation-end'])
const startRunAnimation = () => {
    numList.value[0].className = "in";
}
const resetAnimation = () => {
    numList.value.forEach((item, index) => {
        item.className = index === 0 ? "in" : ""
    })
}
defineExpose({
    startRunAnimation,
    resetAnimation
})
const onAnimationEndHandler = (e: AnimationEvent, index: number) => {
    const { animationName } = e;
    const nextToLast = numList.value.length - 1;
    if (animationName.includes("goIn") && index !== nextToLast) {
        numList.value[index].className = "out";
    } else if (animationName.includes("goOut") && numList.value[index + 1]) {
        numList.value[index + 1].className = "in";
    } else {
        emit("on-animation-end");
    }
}
onMounted(() => {
    for (let i = props.count - 1; i > 0; i--) {
        numList.value.push({
            className: "",
            text: i + ''
        })
    }
    startRunAnimation();
})
</script>
<template>
    <div class="ac-num-group">
        <span v-for="(num, index) in numList" :key="num.text + index" :class="num.className"
            @animationend="onAnimationEndHandler($event, index)" class="ac-num">{{ num.text }}</span>
    </div>
</template>
<style scoped lang="scss">
$numFontColor: #600fe2;

.#{$baseSelector}num-group {
    @extend .el-pos-r, .over-hidden;
    @include setComponent(font-size, 50, px);
    @include setComponent(height, 50, px);
    @include setComponent(max-width, 250, px);
    @include setComponentPercent(width, 100);
    @include color($numFontColor);
    .#{$baseSelector}num {
        @extend .el-pos-a;
        @include setComponentPercent(top, 50);
        @include setComponentPercent(left, 50);
        transform: translate(-50%,-50%) rotate(120deg);
        transform-origin: bottom center;
        &.in {
            transform: translate(-50%,-50%) rotate(0deg);
            animation:goIn .6s ease-in-out;
        }
        &.out {
            animation: goOut .6s ease-in-out;
        }
    }
}

@keyframes goIn {
    0% {
        transform: translate(-50%, -50%) rotate(120deg);
    }

    30% {
        transform: translate(-50%, -50%) rotate(-20deg);
    }

    60% {
        transform: translate(-50%, -50%) rotate(10deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
}

@keyframes goOut {
    0% {
        transform: translate(-50%, -50%) rotate(0);
    }

    60% {
        transform: translate(-50%, -50%) rotate(20deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(-120deg);
    }
}
</style>