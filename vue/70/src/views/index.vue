<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { IMAGE_URL, testimonials } from '../utils/const';
import {
    AsyncContent,
    AsyncOrder,
    AsyncProgressBar,
    AsyncQuote,
    AsyncUser
} from './component';
const current = ref(0);
const timer = ref<ReturnType<typeof setTimeout> | null>(null);
const updateTestimonial = () => {
    if(current.value >= testimonials.length - 1){
        current.value = 0;
    }
    current.value++;
    timer.value = setTimeout(updateTestimonial,10000);
}
const currentTestimonial = computed(() => testimonials[current.value]);
const currentImage = computed(() => IMAGE_URL + (current.value + 1) + '.png');
const currentOrder = computed(() => current.value + 1);
onMounted(() => {
    setTimeout(() => updateTestimonial(),10000);
})
onUnmounted(() => {
    if(timer.value){
        clearTimeout(timer.value);
    }
})
</script>
<template>
    <div class="tbs-container">
        <async-progress-bar></async-progress-bar>
        <async-quote type="left"></async-quote>
        <async-quote type="right"></async-quote>
        <async-content :content="currentTestimonial.text"></async-content>
        <async-user :username="currentTestimonial.name" :role="currentTestimonial.position" :src="currentImage"></async-user>
        <async-order :count="currentOrder"></async-order>
    </div>
</template>
<style lang="scss" scoped>
$containerBgColor: linear-gradient(135deg, #f5b96a 10%, #f86509 90%);
$containerBoxShadow: 0 3px 10px #b87905;

.#{$prefix}container {
    @include setProperty(padding, 50px 80px);
    @include setProperty(max-width, 768px);
    @include setProperty(color, $white);
    @include setProperty(border-radius, 15px);
    @include setProperty(position, relative);
    @include setProperty(background, $containerBgColor);
    @include setProperty(box-shadow, $containerBoxShadow);
}
</style>