<template>
    <component :is="currentComponentName">
        <slot>
            <template v-if="isRenderHTML">
                <span v-html="currentContent"></span>
            </template>
            <template v-else>
                {{ currentContent }}
            </template>
        </slot>
    </component>
</template>
<script lang="ts">
import { defineComponent,ref,PropType,watch } from 'vue';
export default defineComponent({
    props:{
        cName:{
            type:String as PropType<string>,
            default:"p"
        },
        isRenderHTML:{
            type:Boolean as PropType<boolean>,
            default:false
        },
        content:{
            type:String as PropType<string>,
            default:""
        }
    },
    setup(props){
        const currentComponentName = ref(props.cName);
        const currentContent = ref(props.content);
        watch(() => props.cName,(val) => {
            currentComponentName.value = val;
        });
        watch(() => props.content,(val) => {
            currentContent.value = val;
        });
        return {
            currentContent,
            currentComponentName
        }
    }
})
</script>
<style lang="less" scoped>
    p {
        color:#fff;
    }
</style>