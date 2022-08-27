<script lang="ts" setup>
    import { ComponentPublicInstance, nextTick, onMounted, PropType } from '@vue/runtime-core';
    import PreLoadImage from './PreLoadImage.vue'
    import { toRefs } from 'vue';
    import { ref } from '@vue/reactivity';
    import { getImageURL,isTextOverflow } from '../utils/util';
    import LinkIcon from './LinkIcon';
    import CardTitle from './Title';
    const BASEURL = "https://www.eveningwater.com/my-web-projects/";
    const BASE_SOURCE_URL = "https://github.com/eveningwater/my-web-projects/tree/master/";
    const props = defineProps({
        cardSourceURL:String as PropType<string>,
        directory:{
            type:String as PropType<string>,
            default:"javascript"
        },
        href:String as PropType<string>,
        cardName:String as PropType<string>,
        cardIndex:Number as PropType<number>
    });
    const { cardSourceURL,href,cardName,cardIndex } = toRefs(props);
    const titleContainer = ref<ComponentPublicInstance | null>(null);
    onMounted(() => {
        nextTick(() => {
             const element = titleContainer.value?.$el;
             if(isTextOverflow(element)){
                 element.classList.add("mini-web-card-hover-title")
             }else{
                 element.classList.remove("mini-web-card-hover-title")
             }
        })
    })
</script>
<template>
    <div class="mini-web-card">
        <div class="mini-web-card-item-front">
            <PreLoadImage :src="getImageURL(directory,cardSourceURL as string)" alt="图片加载中" class="mini-web-card-img" />
        </div>
        <div class="mini-web-card-item-behind">
            <card-title level="2" class="mini-web-card-title" :data-title="cardName" ref="titleContainer">{{ (cardIndex as number + 1) }}.{{ cardName }}</card-title>
            <div class="mini-web-card-link-container">
                <a :href="BASEURL + href" target="_blank" rel="noopener noreferrer" class="mini-web-card-link">
                    <link-icon></link-icon>
                </a>
                <a :href="BASE_SOURCE_URL + href" target="_blank" rel="noopener noreferrer" class="mini-web-card-link">
                    <link-icon type="githubDProp"></link-icon>
                </a>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @cardBorderColor:#e7e7e7;
    .@{baseSelector}card {
        border-radius: unit(pow(2,2),px);
        border:unit(@full,px) solid fadeout(@cardBorderColor,30%);
        overflow: extract(@overflow,@full);
        background-color: @color;
        color: @optionFontColor;
        box-shadow: unit(@full,px) unit(pow(2,2),px) unit(pow(4,2),px) fade(rgba(0,0,0,.4),10%);
        padding: range(10px,14px,10);
        min-width: unit(3 * pow(10,2) + 2 * pow(10,1),px);
        min-height: unit(2 * pow(10,2),px);
        transition: all convert(400ms,"s") cubic-bezier(0.165, 0.84, 0.44, @full);
        position: extract(@position,@full);
        .m(n,.4,em);
        &:hover {
            box-shadow: unit(@full,px) unit(pow(2,2),px) unit(pow(4,2),px) fade(rgba(0,0,0,.4),40%);
        }
        .@{baseSelector}card-item-behind {
            background-color: fade(@blackColor,70%);
            z-index: @full + @full;
            .flex-center();
            transform: translateY(-100%) scale(0);
            transition: all convert(400ms,"s") cubic-bezier(0.165, 0.84, 0.44, @full);
            flex-direction: column;
            .@{baseSelector}card-title {
                color:@color;
                letter-spacing: unit(sqrt(4),px);
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                width: 160px;
                text-align: extract(@align,@full + @full);
                &.@{baseSelector}card-hover-title {
                    cursor: extract(@cursor,@full);
                    transition: all convert(200ms,"s") cubic-bezier(0.165, 0.84, 0.44, @full);
                    &:hover {
                        @transformOffset:percentage(@half);
                        &::before {
                            content:"";
                            width: @none;
                            height:@none;
                            border-style: solid;
                            border-width: 10px;
                            border-color:@transparent @transparent fade(@bgColor-2,100%) @transparent;
                            position: extract(@position,@full + @full);
                            left: @transformOffset;
                            top:@transformOffset;
                            transform: translate(-@transformOffset,calc(-@transformOffset - 8px));
                        }
                        &::after {
                            content:attr(data-title);
                            position: extract(@position,@full + @full);
                            left: @transformOffset;
                            top:@transformOffset;
                            transform: translate(-@transformOffset,calc(-@transformOffset + 18px));
                            background-color: fade(@bgColor-2,100%);
                           .p(n,10,px);
                           border-radius: unit(pow(2,3),px);
                           z-index: 999;
                           color: @color;
                           white-space: pre;
                           word-break: break-all;
                           font-size: 14px;
                        }
                    }
                }
            }
            .@{baseSelector}card-link-container {
                 .flex-center();
                .@{baseSelector}card-link {
                    text-decoration: extract(@display,length(@display));
                    &:last-of-type {
                        .m(l,8,px);
                    }
                    &:hover {
                        opacity: 0.76;
                    }
                }
            }
        }
        &:hover .@{baseSelector}card-item-behind {
            transform: translateY(0) scale(1);
        }
        .@{baseSelector}card-item-front,.@{baseSelector}card-item-behind {
            position: extract(@position,@full + @full);
            left: @none;
            right: @none;
            bottom: @none;
            top: @none;
            .@{baseSelector}card-img {
                object-fit: cover;
                width: percentage(@full);
                height: percentage(@full);
            }
        }
    }
</style>