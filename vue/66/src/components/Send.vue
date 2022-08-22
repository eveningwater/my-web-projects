<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { iconList, textList } from '../utils/const';
const emit = defineEmits(['send']);
const rateList = ref<{ icon: string, text: string, key: string }[]>();
const isToggle = ref(true);
const currentChecked = ref('unhappy');
const onSend = () => {
    isToggle.value = false;
    emit('send', currentChecked.value);
}
defineExpose({
    changeToggle(v: boolean){
        isToggle.value = v;
    }
})
onMounted(() => {
    rateList.value = iconList.map((item, index) => ({
        icon: item,
        text: textList[index],
        key: `${index}-${index + 1}`
    }))
})
</script>
<template>
    <div class="fud-send-container" :class="{ 'show': isToggle }">
        <strong class="fud-title">How satisfied are you with our <br> customer support performance?</strong>
        <div class="fud-rate">
            <div class="fud-rate-item" v-for="item in rateList" :key="item.key" @click="currentChecked = item.text"
                :class="{ 'active': currentChecked.toLowerCase() === item.text.toLowerCase() }">
                <div class="fud-rate-item-icon" v-html="item.icon"></div>
                <small class="fud-rate-item-text">{{ item.text }}</small>
            </div>
        </div>
        <button type="button" class="fud-btn" @click="onSend">Send Review</button>
    </div>
</template>
<style lang="scss" scoped>
@import '../style/button.scss';
@import '../style/title.scss';
@import '../style/text.scss';
@import '../style/page.scss';

$rateActiveBoxShadow: 0 2px 10px fade-in(rgba(0, 0, 0, 0.02), .4);

.#{$baseSelector}send-container {
    @extend .page;
    @include setProperty(transform, rotate(180deg));
     &.show {
        @include setProperty(transform, rotate(0deg));
         @include setProperty(z-index,1);
    }
    .#{$baseSelector}rate {
        @include setProperty(display, flex);
        @include setProperty(margin, 20px 0);

        &-item {
            @include setProperty(flex, 1 1);
            @include setProperty(cursor, pointer);
            @include setProperty(margin, 20px 5px);
            @include setProperty(padding, 20px);

            &.active {
                @include setProperty(box-shadow, $rateActiveBoxShadow);
                @include setProperty(border-radius, 8px);
            }

            &-icon {
                @include setProperty(width, 40px);
                @include setProperty(height, 40px);
            }
        }
    }
}
</style>