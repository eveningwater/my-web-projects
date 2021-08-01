<template>
    <div class="bottom" id="bottom">
        <Content cName="div">
            {{ content }}
        </Content>
    </div>
</template>
<script lang="ts">
import { getCurrentQuestion,questions } from '../data/data'
import { defineComponent,PropType,ref, toRefs, watch } from 'vue'
import Content from '../components/Content.vue'
export default defineComponent({
    components:{Content},
    props:{
        lang:{
            type:String as PropType<string>,
            default:"en"
        },
        currentOrder:{
            type:Number as PropType<number>,
            default:1
        }
    },
    setup(props){
        const { lang,currentOrder } = toRefs(props);
        const orderValue = currentOrder.value + 1;
        const currentContent:string = getCurrentQuestion(lang.value,orderValue,questions.length);
        const content = ref(currentContent);
        watch(() => props.currentOrder,(val) => {
            content.value = getCurrentQuestion(lang.value,val,questions.length);
        })
        return {
            content
        }
    }
})
</script>
<style lang="less" scoped>
    .bottom {
        position: fixed;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
        font-size: 18px;
    }
</style>