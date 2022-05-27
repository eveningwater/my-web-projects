<script lang="ts" setup>
    import { computed, PropType, ref } from 'vue';
    import dataObject from '../utils/data';
    import type { DataType } from '../utils/data';
    const props = defineProps({
        lang:{
            type:String as PropType<string>,
            default:"en"
        }
    })
    const emit = defineEmits(["on-tab-click"]);
    type LangType = {
        label:string;
        value:string;
    }
    const currentLang = ref(props.lang);
    const tabList = computed(() => dataObject[currentLang.value as keyof DataType].lang as Array<LangType>);
    const onTabHandler= (e:Event) => {
        const target = e.target as HTMLDivElement;
        // The event agent
        if(target.classList.contains('pg-tab-item')){
            const lang = target.dataset.lang;
            // console.log("clicked the tab item:",lang);
            currentLang.value = lang || "en";
            emit("on-tab-click",currentLang.value);
        }
    }
</script>
<template>
    <div class="pg-tab" @click="onTabHandler">
        <div class="pg-tab-item" 
            v-for="(tab,index) in tabList" 
            :key="tab.value + index" 
            :class="{ 'active':(currentLang === tab.value ) }"
            :data-lang="tab.value"
        >
            {{ tab.label }}
        </div>
    </div>
</template>
<style lang="scss" scoped>
    $tabBgColor:linear-gradient(135deg,#f0f1f5 10%,#9b9b9b 90%);
    $tabBgActiveColor:linear-gradient(135deg,#86a3f3 10%,#1860e6 90%);
    $fontColor:fade-out(rgba(67, 39, 224, 1),.1);
    .#{$baseSelector}tab {
        @include background($tabBgColor);
        @include setComponent(left,15,px);
        @include setComponent(top,15,px);
        @include setComponent(border-radius,8,px);
        @extend .el-pos-f,.el-display-flex,.el-jc-center,.el-ai-center;
        &-item {
            @include color($fontColor);
            @include setComponent(padding,15,px);
            @include setComponent(letter-spacing,2,px);
            @include setComponent(font-size,18,px);
            @extend .el-cursor-pointer;
            &:first-of-type {
                border-radius: 8px 0 0 8px;
            }
            &:last-of-type {
                border-radius: 0 8px 8px 0;
            }
            &:hover,&.active {
                @include background($tabBgActiveColor);
                @include color($white);
            }
        }
    }
</style>