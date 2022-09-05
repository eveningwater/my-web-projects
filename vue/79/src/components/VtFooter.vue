<script lang="ts" setup>
    import { ref } from '@vue/reactivity';
    const currentType = ref("");
    const typeList = ref([
        {
            label:"翻译",
            value:"translate"
        },
        {
            label:"清除",
            value:"clear"
        }
    ]);
    const emit = defineEmits(["on-footer-click"])
    const onClickHandler = (type:string) => {
        currentType.value = type;
        emit("on-footer-click",currentType.value);
    }
</script>
<template>
    <footer class="vt-footer">
        <button type="button" v-for="(item,index) in typeList" :key="item.value + index" class="vt-btn" :class="{ 'checked':(currentType === item.value )}" @click="onClickHandler(item.value)">{{ item.label }}</button>
    </footer>
</template>