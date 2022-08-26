
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { quizData } from '../utils/const';
const AsyncTitle = defineAsyncComponent(() => import('@/components/Title.vue'));
const AsyncAnswer = defineAsyncComponent(() => import('@/components/Answer.vue'));
const current = ref(0);
const score = ref(0);
const currentAnswer = ref<string>();
const answerRef = ref<{ clearAnswer: () => void }>();
const onChangeHandler = (v: string) => {
    currentAnswer.value = v;
}
const onClickHandler = () => {
    if (current.value === quizData.length) {
        current.value = 0;
        score.value = 0;
        return;
    }
    if(!currentAnswer.value){
        return;
    }
    if (currentAnswer.value === quizData[current.value].correct) {
        score.value++;
    }
    current.value++;
    currentAnswer.value = '';
    answerRef.value?.clearAnswer();
}
</script>
<template>
    <div class="quiz-container">
        <div class="quiz-content">
            <async-title class="quiz-title" level="2">
                {{ current === quizData.length ? `You answered ${score} /
                                ${quizData.length} questions correctly!` : quizData[current].question
                }}</async-title>
            <async-answer :answer="quizData[current]" @on-select="onChangeHandler" v-if="current < quizData.length"
                ref="answerRef"></async-answer>
            <button type="button" class="quiz-btn" @click="onClickHandler">{{ current === quizData.length ? 'reload'
                    :
                    'submit'
            }}</button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
$containerBoxShadow: 0 4px 12px #80f34b;
$containerBgColor: linear-gradient(135deg, #fffdfd 10%, #eeeeee 90%);
$btnBgColor: linear-gradient(135deg, #acf16b 10%, #0af157 90%);
$btnHoverBgColor: linear-gradient(135deg, #bcf08c 10%, #07cf4a 90%);
$titleColor: #82f45b;

.#{$prefix}container {
    @include setProperty(width, percentage(1));
    @include setProperty(max-width, 600px);
    @include setProperty(box-shadow, $containerBoxShadow);
    @include setProperty(overflow, hidden);
    @include setProperty(padding, 20px);
    @include setProperty(border-radius, 10px);
    @include setProperty(background, $containerBgColor);

    .#{$prefix}content {
        @include setProperty(padding, 2em);

        .#{$prefix}title {
            @include setProperty(color, $titleColor);
            @include setProperty(padding, .2em);
        }

        .#{$prefix}btn {
            @include setProperty(display, inline-block);
            @include setProperty(padding, 1.3rem 3rem);
            @include setProperty(border, none);
            @include setProperty(border-radius, 6px);
            @include setProperty(font-size, 1.3rem);
            @include setProperty(color, $white);
            @include setProperty(cursor, pointer);
            @include setProperty(background, $btnBgColor);
            @include setProperty(letter-spacing, 2px);
            @include setProperty(outline, none);
            @include setProperty(margin-top, 1.2rem);
            @include setProperty(width, percentage(1));
            @include setProperty(transition, background .4s cubic-bezier(.123, .223, .456, .8));

            &:hover {
                @include setProperty(background, $btnHoverBgColor);
            }
        }
    }
}
</style>