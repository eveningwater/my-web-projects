<template>
    <footer class="mini-web-footer">
        {{ lang === "en" ? "Links:" : "友情链接:"}}
        <a 
            v-for="(link,index) in linkList" 
            :key="link.text + index" 
            :href="link.href" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="mini-web-footer-link"
        >{{ link.text }}</a>
    </footer>
</template>
<script lang="ts" setup>
    import { computed, readonly } from '@vue/reactivity';
    import { PropType, ref } from 'vue';
    import { linkListData  } from '../utils/const';
    import type { LinkListType,LinkItemType } from '../utils/const';
    const props = defineProps({
        lang:{
            type:String as PropType<string>,
            default:"en"
        }
    });
    const linkList = computed(() => readonly(ref<LinkItemType>(linkListData[props.lang as keyof LinkListType])).value);
</script>
<style lang="less" scoped>
    @activeColor:#efae23;
    .@{baseSelector}footer {
        .flex-center();
        min-height: unit(pow(8,2) - pow(2,2),px);
        flex-wrap: wrap;
        color:@scrollBarColor-1;
        .p(n,20,px);
        .@{baseSelector}footer-link {
            text-decoration: extract(@display,length(@display));
            color:@color;
            transition: all convert(pow(10,2) * 6ms,"s") cubic-bezier(0.165, 0.84, 0.44, @full);
            .m(l,.5,em);
            .m(r,.5,em);
            .m(t,5,px);
            .m(b,5,px);
            &:hover {
                color:@activeColor;
            }
        }
    }
</style>