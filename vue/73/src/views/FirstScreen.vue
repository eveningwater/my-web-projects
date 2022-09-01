<script lang="ts" setup>
import { computed, defineAsyncComponent, PropType, ref, toRefs } from 'vue';
import { globalData, GlobalDataKey } from '../utils/const';
const AsyncScreen = defineAsyncComponent(() => import('@/components/Screen.vue'));
const AsyncTitle = defineAsyncComponent(() => import('@/components/Title.vue'));
const props = defineProps({
    lang:String as PropType<GlobalDataKey>
});
const emit = defineEmits(['on-click','update:modelValue'])
const { lang } = toRefs(props);
const isHidden = ref(false);
const data = computed(() => globalData[lang?.value as GlobalDataKey]);
const onStartHandler = () => {
    isHidden.value = true;
    emit('on-click',isHidden.value);
}
defineExpose({
    toggleScreen:(v: boolean) => isHidden.value = v
})
</script>
<template>
    <async-screen :class="{ hidden:isHidden }">
        <async-title class="icg-screen-title">{{ data.firstTitle }}</async-title>
        <button type="button" class="icg-screen-start-btn icg-screen-btn" @click="onStartHandler">{{ data.playText }}</button>
    </async-screen>
</template>
<style lang="scss" scoped>
    .#{$prefix}screen-start-btn{
        @include setProperty(margin-top,1rem);
    }
</style>