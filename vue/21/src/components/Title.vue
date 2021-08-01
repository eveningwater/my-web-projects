<template>
    <component :is="componentName">
        <slot>{{ title }}</slot>
    </component>
</template>
<script lang="ts">
import { parseObject, parseObjectType } from '../data/data';
import { defineComponent, PropType, ref, watch } from 'vue';
export default defineComponent({
    props:{
        lang:{
            type:String as PropType<String>,
            default:"en"
        },
        level:{
            type:Number as PropType<Number>,
            default:1
        }
    },
    setup(props){
        const getTitle = (lang:string) => parseObject[lang as keyof parseObjectType].title;
        const currentTitle:string = getTitle(props.lang as string);
        //h1
        const componentName = ref("h" + props.level);
        const title = ref(currentTitle);
        watch(() => props.lang,(val) => {
            title.value = getTitle(val as string);
        })
        return {
            componentName,
            title
        }
    }
})
</script>
<style lang="less" scoped>
    h1,h2,h3,h4,h5,h6 {
        color: #fff;
        letter-spacing: 2px;
    }
    h1 {
        font-size: 32px;
        margin-bottom: 15px;
        text-align: center;
    }
</style>