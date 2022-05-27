<template>
    <svg 
        viewBox="0 0 1024 1024" 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        :width="width"
        :height="height"
    >
        <template v-if="Array.isArray(iconComponent)">
            <path 
                v-for="(item,index) in iconComponent" 
                :key="item.prop + index" 
                :fill="item.color ? item.color : color" 
                :d="item.prop"
            ></path>
        </template>
        <template v-else-if="isString(iconComponent)">
             <path :fill="color" :d="iconComponent"></path>
        </template>
    </svg>
</template>
<script lang="ts" setup>
    import { iconPathData } from "../utils/iconPathData";
    import type { IconType } from "../utils/iconPathData";
    import { isString } from "../utils/util";
    import { computed } from "vue";
    const props = defineProps({
        width:{
            type:Number,
            default:30
        },
        height:{
            type:Number,
            default:30
        },
        type:String,
        color:{
            type:String,
            default:"#fff"
        }
    });
    const iconComponent = computed(() => iconPathData[props.type as keyof IconType]);
</script>