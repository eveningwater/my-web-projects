<template>
    <div class="ds-right-slide" 
    :style="{ 
        'transform':`${ transform.translate }(${ transform.value })`,
        'width':slideStyle.slideRightWidth
    }">
        <div 
            class="ds-right-slide-item" 
            v-for="(item,index) in imageItems" 
            :key="item.src + index"
            :style="{
                backgroundImage:`url(${image_url+item.src})`,
                width:slideStyle.itemWidth
            }"
        ></div>
    </div>
</template>
<script lang="ts" setup>
    import { computed, ref } from 'vue';
    const image_url = computed(() => "https://www.eveningwater.com/my-web-projects/jQuery/12/img/");
    const imageItems = ref<Array<{ src:string }>>([]);
    for(let i = 1;i <= 4;i++){
        imageItems.value.push({ src:`${i}.jpg` });
    }
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
                slideRightWidth:"",
                itemWidth:""
            })
        }
    });
    const transform = computed(() => props.transform);
    const slideStyle = computed(() => props.slideStyle);
</script>