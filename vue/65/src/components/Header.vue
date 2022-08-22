<script setup lang="ts">
import { defineAsyncComponent, PropType } from 'vue';
const props = defineProps({
    modelValue: String as PropType<string>
});
const emit = defineEmits(['update:modelValue'])
const AsyncTitle = defineAsyncComponent(() => import('./Title.vue'));
</script>
<template>
    <header class="luf-header">
        <async-title level="3" class="luf-header-title">Live User Filter</async-title>
        <small class="luf-header-subtitle">Search by name and/or location</small>
        <input type="text" class="luf-header-input" placeholder="enter the user name or location"
            :value="props.modelValue" @input="emit('update:modelValue',($event.target as HTMLInputElement).value)"/>
    </header>
</template>
<style lang="scss" scoped>
$headerBgColor: linear-gradient(135deg,#b86aec 10%,#b30ee6 90%);
$inputBgColor: fade-out(rgba(0,0,0,1),.7);
$inputPlaceColor: fade-in(rgba(255,255,255,.1),.4);
.#{$baseSelector}header {
    @include setProperty(background,$headerBgColor);
    @include setProperty(color,#fff);
    @include setProperty(padding,20px 30px);
    @include setProperty(width,percentage(1));
    &-title {
        @include setProperty(font-size,24px);
    }
    &-subtitle {
        @include setProperty(display,inline-block);
        @include setProperty(opacity,.8);
        @include setProperty(margin,.4em 0);
    }
    &-input {
        @include setProperty(width,percentage(1));
        @include setProperty(display,inline-block);
        @include setProperty(border-radius,25px);
        @include setProperty(color,$white);
        @include setProperty(border,none);
        @include setProperty(background,$inputBgColor);
        @include setProperty(font-size,14px);
        @include setProperty(padding,12px 16px);
        @include setProperty(outline,none);
    }
    ::-webkit-input-placeholder {
        @include setProperty(color,$inputPlaceColor);
        @include setProperty(font-size,14px);
    }
}
</style>