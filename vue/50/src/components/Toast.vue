<template>
    <div class="tn-toast" :class="{ ['tn-toast-' + type]:true }" v-if="show" :style="{ left:left + 'px',top:top + 'px' }">
        <slot>
            {{ message }}
        </slot>
        <span class="tn-toast-close-btn" v-if="showClose" @click="onCloseHandler">&times;</span>
    </div>
</template>
<script lang="ts" setup>
    import { ref,watch } from 'vue';
    import { consoleByColorKey } from '../utils/utils';
    const props = defineProps({
        message:String,
        showClose:Boolean,
        type:{
            type:String,
            validator:(value:string) => {
                return ["default","info","success","error","warning"].indexOf(value) > -1;
            },
            default:"default"
        },
        visible:Boolean,
        left:Number,
        top:Number
    });
    const show = ref(false);
    const emit = defineEmits(["update:visible"]);
    watch(() => props.visible,(val:boolean) => {
        show.value = val;
    },{ immediate:true });
    watch(show,(val:boolean) => emit("update:visible",val));
    const onCloseHandler = (e:MouseEvent) => {
        const target = e?.target as HTMLSpanElement;
        show.value = false;
        target.parentElement?.parentElement?.remove();
    };
    consoleByColorKey('消息内容是:' + props.message,"magenta");
</script>
<style lang="scss" scoped>
    @import "./toast.scss";
</style>