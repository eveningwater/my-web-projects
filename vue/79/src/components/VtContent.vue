<script lang="ts" setup>
    import { ref } from '@vue/reactivity';
    import { onMounted, watchEffect } from 'vue';
    import { useWordStore } from "../store/store";
    import $message from '../utils/message';
    type ResSuccessType = {
        trans_result:Array<{ dst:string,src:string }>;
        from:string;
        to:string;
    };
    type ResErrorType = {
        error_code:string;
        error_msg:string;
    };
    type ResType = ResSuccessType | ResErrorType;
    interface WindowType extends Window {
        getTransLateCallback?:Function;
    }
    const wordStore = useWordStore();
    const word = ref("");
    const result = ref("");
    const getTransLateCallback = (res:ResType) => {
        // Extract取出对应的类型
        const resError = res as Extract<ResType,ResErrorType>;
        // Exclude排除对应的类型
        const resSuccess = res as Exclude<ResType,ResErrorType>;
        if(resError.error_code){
            return $message.error(resError.error_msg);
        }
        result.value = resSuccess.trans_result[0].dst;
    }
    onMounted(() => (window as WindowType).getTransLateCallback = getTransLateCallback);
    watchEffect(() => {
        wordStore.changeWord(word.value.trim());
    });
</script>
<template>
    <section class="vt-content">
        <textarea class="vt-textarea" placeholder="请输入你要翻译的单词或语句" v-model="word"></textarea>
        <textarea class="vt-textarea" placeholder="翻译结果" disabled v-model="result"></textarea>
    </section>
</template>