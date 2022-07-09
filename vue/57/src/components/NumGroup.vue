<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const COUNT = 10;
const numList = ref<{ text:string; className:string } []>([])
const emit = defineEmits(['on-animation-end'])
const startRunAnimation = () => {
    numList.value[0].className = "in";
}
const resetAnimation = () => {
    numList.value.forEach((item,index) => {
        item.className = index === 0 ? "in" : ""
    })
}
const onAnimationEndHandler = (e:AnimationEvent,index:number) => {
    const { animationName } = e;
    const nextToLast = numList.value.length - 1;
    if(animationName === "goIn" && index !== nextToLast){
        numList.value[index].className = "out";
    }else if(animationName === "goOut" && numList.value[index + 1]){
        numList.value[index + 1].className = "in";
    }else{
        emit("on-animation-end");
    }
}
onMounted(() => {
    for(let i = COUNT - 1;i > 0;i--){
        numList.value.push({
            className:"",
            text:i + ''
        })
    }
    startRunAnimation();
})
</script>
<template>
    <div class="ac-num-group">
        <span v-for="(num,index) in numList" :key="num.text + index" :class="num.className" @animationend="onAnimationEndHandler($event,index)">{{ num.text }}</span>
    </div>
</template>
<style scoped lang="scss">
    $numFontColor:#600fe2;
    .#{$baseSelector}num-group {
        @extend .el-pos-r,.el-over-hidden;
        @include setComponent(font-size,50,px);
        @include setComponent(height,50,px);
        @include setComponent(max-width,250,px);
        @include setComponentPercent(width,100);
        @include color($numFontColor);
    }
</style>