<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue';
const AsyncModal = defineAsyncComponent(() => import('./Modal.vue'));
const formList = ref<{ key: string, text: string, isComplete: boolean }[]>([]);
const inputValue = ref<string>();
const deleteIndex = ref<number>();
const showModal = ref(false);
const onAddHandler = (e: Event) => {
    e.preventDefault();
    const v = inputValue.value?.trim();
    if (v) {
        formList.value.push({
            key: Date.now() + (Math.random() * 100000).toString().slice(0, 6),
            text: v,
            isComplete: false
        });
    }
    setTimeout(() => {
        inputValue.value = '';
    }, 1000)
}
const onDeleteHandler = (index: number) => {
    deleteIndex.value = index;
    showModal.value = true;
}
const onSureHandler = () => {
    if (formList.value.length <= 0 || typeof deleteIndex.value !== 'number') {
        return;
    }

    formList.value.splice(deleteIndex.value, 1);
    showModal.value = false;
}
const onCompleteHandler = (index: number) => {
    formList.value[index].isComplete = true;
}
const onUnCompleteHandler = (index: number) => {
    formList.value[index].isComplete = false;
}
</script>
<template>
    <form class="todo-form" @submit="onAddHandler">
        <input type="text" class="todo-form-input" v-model="inputValue" placeholder="Enter your todo" />
        <ul class="todo-form-list">
            <li class="todo-form-list-item" v-for="(item, index) in formList" :key="item.key"
                :class="{ 'complete': item.isComplete }" @contextmenu.prevent="onDeleteHandler(index)"
                @click="onCompleteHandler(index)" @dblclick="onUnCompleteHandler(index)">{{ item.text }}</li>
        </ul>
    </form>
    <async-modal title="温馨提示" content="确定要删除吗?" @on-ok="onSureHandler" v-model="showModal"></async-modal>
</template>
<style lang="scss" scoped>
$formBoxShadow: 0 1px 10px #fdfefe;
$inputBorderColor: #cecece;
$listBgColor: linear-gradient(135deg, #f36c54 10%, #f33a34 90%);
$completeColor: #2396ef;

.#{$prefix}form {
    @include setProperty(width, percentage(1));
    @include setProperty(max-width, 400px);
    @include setProperty(margin, 0 auto);
    @include setProperty(box-shadow, $formBoxShadow);

    &-input {
        @include setProperty(width, percentage(1));
        @include setProperty(padding, 1rem 2rem);
        @include setProperty(font-size, 1.4rem);
        @include setProperty(border-radius, 5px 5px 0 0);
        @include setProperty(border, 1px solid $inputBorderColor);
    }

    &-list {
        @include setProperty(list-style, none);
        @include setProperty(background, $listBgColor);
        @include setProperty(border-radius, 0 0 5px 5px);

        &-item {
            @include setProperty(color, $white);
            @include setProperty(padding, 1.4rem 2rem);
            @include setProperty(cursor, pointer);
            @include setProperty(border-top, 1px solid $inputBorderColor);
            @include setProperty(font-size, 20px);

            &.complete {
                @include setProperty(color, $completeColor);
                @include setProperty(text-decoration, line-through);
            }
        }
    }
}
</style>