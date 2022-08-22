<script setup lang="ts">
import { defineAsyncComponent, ref, watch } from 'vue';
const AsyncSend = defineAsyncComponent(() => import('./Send.vue'));
const AsyncReceive = defineAsyncComponent(() => import('./Receive.vue'));
const toggle = ref(true);
const text = ref('');
const sendRef = ref();
const onSend = (v: string) => {
    toggle.value = !toggle.value;
    console.log(v);
    
    text.value = v;
}

watch(() => toggle.value, (val) => {
    if (sendRef.value) {
        sendRef.value?.changeToggle(val);
    }
})
</script>
<template>
    <div class="fud-panel">
        <div class="fud-panel-box">
            <async-send @send="onSend" ref="sendRef"></async-send>
            <async-receive @back="toggle = !toggle" :text="text" :show="!toggle"></async-receive>
        </div>
    </div>
</template>
<style lang="scss" scoped>
$panelBoxShadow: 0 3px 10px fade-in(rgba(0, 0, 0, 0), .4);

.#{$baseSelector}panel {
    @extend .flex-center;
    @include setProperty(max-width, 400px);
    @include setProperty(border-radius, 10px);
    @include setProperty(font-size, 90%);
    @include setProperty(text-align, center);
    @include setProperty(padding, 30px);
    @include setProperty(box-shadow, $panelBoxShadow);
    @include setProperty(flex-direction, column);
    @include setProperty(background, $white);

    &-box {
        @include setProperty(width, 300px);
        @include setProperty(height, 300px);
        @include setProperty(transform-style, preserve-3d);
        @include setProperty(transition, transform .3s ease);
        @include setProperty(position, relative);
    }
}
</style>