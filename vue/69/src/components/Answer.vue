
<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
const props = defineProps({
    answer:{
        type: Object as PropType<Record<string,string>>,
        default: () => ({})
    }
})
const answerKeys = Object.keys(props.answer).filter(key => /^[abcd]$/.test(key));
const currentAnswer = ref<string>()
const data = computed(() => answerKeys.map((item,index) => {
    const newItem:Record<string,string> = {};
    newItem['label'] = props.answer[item];
    newItem['key'] = `${index}-${index + 1}`;
    return newItem;
}));
const emit = defineEmits(['on-select']);
const onChangeHandler = (v: string) => {
    currentAnswer.value = v;
    emit('on-select',v);
}
defineExpose({
    clearAnswer:() => {
        currentAnswer.value = '';
    }
})
</script>
<template>
    <ul class="quiz-list">
        <li class="quiz-list-li" v-for="(item,index) in data" :key="item.key">
            <input type="radio" class="quiz-list-li-radio" @change="onChangeHandler(answerKeys[index])" :checked="currentAnswer === answerKeys[index]"/>
            <label class="quiz-list-li-label" @click="onChangeHandler(answerKeys[index])">{{ item?.label }}</label>
        </li>
    </ul>
</template>
<style lang="scss" scoped>
$labelColor:#91fc70;
.#{$prefix}list {
    @include setProperty(list-style, none);
    &-li {
        @include setProperty(font-size,1.3rem);
        @include setProperty(margin,.5rem 0);
        &-radio {
            @include setProperty(cursor,pointer);
        }
        &-label {
            @include setProperty(cursor,pointer);
            @include setProperty(color,$labelColor);
            @include setProperty(margin-left,8px);
        }
    }
}
</style>