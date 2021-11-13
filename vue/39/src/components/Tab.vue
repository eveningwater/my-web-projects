<script lang="ts" setup>
    import { PropType } from '@vue/runtime-core';
    import { computed, ref, toRefs } from 'vue';
    import { langData } from '../utils/data';
    import type { LangType } from '../utils/data';
    const props = defineProps({
        lang:{
            type:String as PropType<string>,
            default:"en",
            validator:(value:string) => ["en","zh"].indexOf(value) > -1
        }
    });
    const emit = defineEmits(["on-tab-click"]);
    const { lang } = toRefs(props);
    const currentLang = ref(lang.value);
    const langTabData = computed(() => langData[currentLang.value as keyof LangType])
    const onChangeLangHandler = (value:string) => {
        currentLang.value = value;
        emit("on-tab-click",currentLang.value);
    };
</script>
<template>
    <div class="dw-tab">
        <div 
            class="dw-tab-item p-10" 
            v-for="(tab,index) in langTabData" 
            :key="tab.value + index" 
            :class="{'active':(currentLang === tab.value) }"
            @click="onChangeLangHandler(tab.value)"
        >{{ tab.label }}</div>
    </div>
</template>
<style lang="scss" scoped>
    @import "../style/variable.scss";
    $tabItemColor-1:#78bbee;
    $tabItemColor-2:#1b91eb;
    $tabItemActiveColor-1:#789dee;
    $tabItemActiveColor-2:#1b53eb;
    .#{$baseSelector}tab {
        position: fixed;
        left: 10px;
        top: 10px;
        @include flex-center;
        border-radius: 5px;
        .#{$baseSelector}tab-item {
            background: linear-gradient(13deg,$tabItemColor-1 10%,$tabItemColor-2 90%);
            cursor: pointer;
            transition: all .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            &.active {
                background: linear-gradient(13deg,$tabItemActiveColor-1 10%,$tabItemActiveColor-2 90%);
            }
            &:first-of-type {
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }
            &:last-of-type {
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        }
    }
</style>