<script lang="ts" setup>
    import { reactive } from '@vue/reactivity';
    import { onMounted, watch } from '@vue/runtime-core';
    interface ReactiveType {
        tabList:Array<{ label:string,value:string }>;
        currentLang:string;
    }
    const state = reactive<ReactiveType>({
        tabList:[],
        currentLang:"en"
    });
    const emit = defineEmits(["on-tab-click"])
    const onChangeLang = () => {
        if(state.currentLang === "en"){
            state.tabList = [
                { label:"EN",value:"en" },
                { label:"ZH",value:"zh" }
            ]
        }else {
            state.tabList = [
                { label:"英文",value:"en" },
                { label:"简体中文",value:"zh" }
            ]
        }
        emit("on-tab-click",state.currentLang);
    }
    onMounted(() => onChangeLang());
    watch(() => state.currentLang,() => onChangeLang());
    const onTabClickHandler =(value:string) => state.currentLang = value;
</script>
<template>
    <div class="mini-web-tab-container">
        <div 
            class="mini-web-tab-item" 
            v-for="(item,index) in state.tabList" 
            :key="index + item.value" 
            v-text="item.label" 
            @click="onTabClickHandler(item.value)"
            :class="{ active:item.value === state.currentLang }"
        ></div>
    </div>
</template>
<style lang="less" scoped>
    @tabBgcolor-1:#84c1f0;
    @tabBgcolor-2:#2396ef;
    @tabActiveBgcolor-1:#f5ae51;
    @tabActiveBgcolor-2:#e46e0d;
    .@{baseSelector}tab-container {
        .flex-center();
        border-radius: unit(round(4.55),px);
        .@{baseSelector}tab-item {
            font-size: unit(pow(10,1) + pow(2,2),px);
            .p(t,8,px);
            .p(b,8,px);
            .p(l,10,px);
            .p(r,10,px);
            color:@color;
            background: linear-gradient(@rotate,@tabBgcolor-1 10%,@tabBgcolor-2 90%);
            cursor: extract(@cursor,@full);
            transition: all convert(pow(10,2) * 5ms,"s") cubic-bezier(0.075, 0.82, 0.165, @full);
            &.active {
                background: linear-gradient(@rotate,@tabActiveBgcolor-1 10%,@tabActiveBgcolor-2 90%);
            }
            &:first-of-type {
                border-top-left-radius:unit(round(4.55),px);
                border-bottom-left-radius: unit(round(4.55),px);
            }
            &:last-of-type {
                border-top-right-radius:unit(round(4.55),px);
                border-bottom-right-radius: unit(round(4.55),px);
            }
        }
    }
</style>