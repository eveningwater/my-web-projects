<template>
    <div 
        class="ds-left-slide"
        :style="{ 
            'transform':`${ transform.translate }(${ transform.value })`,
            'width':slideStyle.slideLeftWidth,
            'left':slideStyle.left,
            'top':slideStyle.top 
        }"
    >
        <div 
            v-for="(item,index) in leftSlideItems" 
            :key="item.text + index" 
            class="ds-left-slide-item" 
            :style="{'width':slideStyle.itemWidth }"
        >
            <async-title>美女{{ index + 1}}</async-title>
            <p>这是一个{{ item.text }}</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { computed, defineAsyncComponent, ref } from 'vue';
    const AsyncTitle = defineAsyncComponent(() => import("./Title.vue"));
    const leftSlideItems = ref<Array<{text:string}>>([
        {
            text:"美女"
        },
        {
            text:"大美女"
        },
        {
            text:"超级大美女"
        },
        {
            text:"超级超级大美女"
        }
    ]);
    const props = defineProps({
        transform:{
            type:Object,
            default:() => ({
                translate:"",
                value:""
            })
        },
        slideStyle:{
            type:Object,
            default:() => ({
                slideLeftWidth:"",
                itemWidth:"",
                left:"",
                top:""
            })
        }
    });
    const transform = computed(() => props.transform);
    const slideStyle = computed(() => props.slideStyle);
    console.log(slideStyle.value)
</script>