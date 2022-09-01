<script lang="ts" setup>
import { computed, defineAsyncComponent, PropType, ref, toRefs, watch } from 'vue';
import { globalData, GlobalDataKey, IMAGE_URL, insectNameList } from '../utils/const';
const AsyncScreen = defineAsyncComponent(() => import('@/components/Screen.vue'));
const AsyncTitle = defineAsyncComponent(() => import('@/components/Title.vue'));
const props = defineProps({
    lang: String as PropType<GlobalDataKey>
});
const emit = defineEmits(['on-select'])
const { lang } = toRefs(props);
const isHidden = ref(false);
const data = computed(() => globalData[lang?.value as GlobalDataKey]);
const list = computed(() => data.value.insectNameList.map((item, index) => ({ label: item, key: `${item}-${index + 1}`, value: insectNameList[index].name })));
const onSelectHandler = (v: string) => {
    isHidden.value = true;
    emit('on-select', v);
}
defineExpose({
    toggleScreen:(v: boolean) => isHidden.value = v
})
</script>
<template>
    <async-screen :class="{ hidden: isHidden }">
        <async-title class="icg-screen-title">{{ data.secondTitle }}</async-title>
        <ul class="icg-screen-list">
            <li class="icg-screen-list-li" v-for="item in list" :key="item.key">
                <div class="icg-screen-list-li-btn" @click="onSelectHandler(item.value)">
                    <p class="icg-screen-list-li-btn-name">{{ item.label }}</p>
                    <img :src="IMAGE_URL + item.value + '.png'" :alt="item.label" class="icg-screen-list-li-btn-img" />
                </div>
            </li>
        </ul>
    </async-screen>
</template>
<style lang="scss" scoped>
$color: #13cc5a;

.#{$prefix}screen-list {
    @include setProperty(height, 60vh);
    @include setProperty(list-style, none);
    @include setProperty(overflow-x, hidden);
    @include setProperty(flex-wrap, wrap);
    @extend .flex-center;

    &-li {
        @include setProperty(margin, 10px);

        &-btn {
            @extend .flex-center;
            @include setProperty(padding, percentage(.05));
            @include setProperty(cursor, pointer);
            @include setProperty(width, 150px);
            @include setProperty(height, 150px);
            @include setProperty(border, 3px solid $white);
            @include setProperty(background, transparent);
            @include setProperty(flex-direction, column);

            &:hover {
                @include setProperty(background, $white);
                @include setProperty(color, $color);
            }

            &-name {
                @include setProperty(margin, .4rem 0);
                @include setProperty(font-size, 18px);
            }

            &-img {
                @include setProperty(width, 100px);
                @include setProperty(height, 100px);
                @include setProperty(object-fit, contain);
            }
        }
    }
}
</style>