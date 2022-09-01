<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import { globalData, GlobalDataKey } from '../utils/const';
import { commonPropKey } from './tabProp';
const props = defineProps({
    lang: commonPropKey,
    modelValue:commonPropKey
});
const emit = defineEmits(['on-tab-click','update:modelValue']);
const { lang } = toRefs(props);
const tabList = computed(() => globalData[lang.value].tabList.map((item, index) => ({ key: `${item}-${index + 1}`, value: item })));
const current = ref(lang.value);
const onTabHandler = (v:string) => {
    current.value = v as GlobalDataKey;
    emit('on-tab-click',current.value);
}
watch(() => current.value,(val) => {
    emit('update:modelValue',val)
},{ immediate:true });
</script>
<template>
    <div class="icg-tab">
        <div class="icg-tab-item" v-for="tab in tabList" :key="tab.key" :class="{ active: current === tab.value }" @click="onTabHandler(tab.value)">{{ tab.value }}</div>
    </div>
</template>
<style lang="scss" scoped>
$tabBgColor: linear-gradient(135deg, #ebf0ea 10%, #f7f7f7 90%);
$tabActiveBgColor: linear-gradient(135deg, #c2f3b3 10%, #07cf28 90%);
$tabColor: #11af0b;

.#{$prefix}tab {
    @include setProperty(position, fixed);
    @include setProperty(left, percentage(.5));
    @include setProperty(bottom, 10px);
    @include setProperty(transform, translateX(-50%));
    @include setProperty(z-index, 100);
    @extend .flex-ver-center;

    &-item {
        @include setProperty(padding, .4rem 1rem);
        @include setProperty(cursor, pointer);
        @include setProperty(background, $tabBgColor);
        @include setProperty(color, $tabColor);

        &:hover,
        &.active {
            @include setProperty(background, $tabActiveBgColor);
            @include setProperty(color, $white);
        }

        &:first-child {
            @include setProperty(border-radius,4px 0 0 4px);
        }
        &:last-child {
            @include setProperty(border-radius,0 4px 4px 0);
        }
    }
}
</style>