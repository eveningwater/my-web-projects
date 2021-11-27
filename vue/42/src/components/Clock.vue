<script lang="ts" setup>
    import { onMounted, onUnmounted, PropType } from '@vue/runtime-core';
    import { computed, CSSProperties, reactive } from 'vue';
    import { langText } from '../utils/const';
    import type { LangTextType,CommonLangType } from '../utils/const';
    import { scale } from '../utils/util';
    const props = defineProps({
        lang:{
            type:String as PropType<string>,
            default:"en"
        }
    });
    interface NeedleType {
        className:string;
    }
    interface StyleType {
       hour:Partial<CSSProperties> | string;
       minute:Partial<CSSProperties> | string;
       second:Partial<CSSProperties> | string;
    }
    interface StateType {
        needleList:Array<NeedleType>;
        timer:unknown;
        style:StyleType;
        hour:string | number;
        minute:string | number;
        month:string | number;
        day:string | number;
        time:string | number;
    }
    const state = reactive<StateType>({
         needleList:[
             {
                 className:"hour"
             },
             {
                 className:"minute"
             },
             {
                 className:"second"
             }
         ],
         timer:null,
         style:{
             hour:{},
             minute:{},
             second:{}
         },
         hour:"",
         minute:"",
         month:"",
         day:"",
         time:""
    });
    const onStartDate = () => {
        const date = new Date(),
              month = date.getMonth(),
              day = date.getDay(),
              time = date.getDate(),
              hour = date.getHours(),
              hourForClock = hour % 12,
              minute = date.getMinutes(),
              second = date.getSeconds();
        state.style["hour"] = { transform:`translate(-50%,-100%) rotate(${ scale(hourForClock,0,11,0,360) }deg)`};
        state.style["minute"] = { transform:`translate(-50%,-100%) rotate(${ scale(minute,0,59,0,360) }deg)`};
        state.style["second"] = { transform:`translate(-50%,-100%) rotate(${ scale(second,0,59,0,360) }deg)`};
        state.hour = hour;
        state.minute = minute;
        state.month = month;
        state.day = day;
        state.time = time;
        state.timer = setTimeout(onStartDate,1000);
    }
    const computedStyle = computed(() => (prop:string) => state.style[prop as keyof StyleType]);
    onMounted(() => onStartDate());
    onUnmounted(() => {
        if(state.timer){
            clearTimeout(state.timer as number);
        }
    });
</script>
<template>
    <div class="tc-clock-container">
        <div class="tc-clock">
            <div 
                v-for="(needle,index) in state.needleList" 
                :key="needle.className + index" 
                :class="'tc-' + needle.className"
                :style="computedStyle(needle.className)" 
                class="tc-needle"
            ></div>
            <div class="tc-center-point"></div>
        </div>
        <div class="tc-time">
            {{ state.hour }}:
            {{ state.minute >= 10 ? state.minute : '0' + state.minute }}&nbsp;
            {{ langText[(props.lang) as keyof LangTextType][("time-"+(state.hour >= 12 ? "after" : "before")+"-text") as keyof CommonLangType] }}
        </div>
        <div class="tc-date">
            {{ langText[(props.lang) as keyof LangTextType].days[(state.day) as keyof Array<string>] }},
            {{ langText[(props.lang) as keyof LangTextType].months[(state.month) as keyof Array<string>] }}
            <span className="tc-circle">{{ state.time }}</span>
            {{ langText[(props.lang) as keyof LangTextType]["date-day-text"] }}
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import "../style/variable.scss";
    .#{$baseSelector}clock-container {
        @include flex-space;
        @extend .flex-column;
        .#{$baseSelector}clock {
            width: 200 + px;
            height: 200 + px;
            border: {
                width:1 + px;
                style:solid;
                radius:percentage(0.5);
                color:$darkColor;
            };
            background-color: $lightColor;
            @include m("-top",15,px);
            @include m("-bottom",15,px);
            position: map-get($position, "r");
            .pos-half {
                position: map-get($position, "a");
                left: percentage(0.5);
                top:percentage(0.5);
                $half:percentage(0.5);
                transform: translate(-$half,-$half);
                border-radius: percentage(0.5);
            }
            .#{$baseSelector}needle {
                position: map-get($position, "a");
                left: percentage(0.5);
                top:percentage(0.5);
                width: 4px;
                height: 55px;
                transform-origin: bottom center;
                @extend .base-transition;
                background: linear-gradient(135deg,#e2cd87 10%,#ecb709 90%);
                &.#{$baseSelector}minute {
                    background: linear-gradient(135deg,#87b1e2 10%,#0991ec 90%);
                    height: 75px;
                }
                &.#{$baseSelector}second {
                    background: linear-gradient(135deg,#b687e2 10%,#9909ec 90%);
                    height: 95px;
                }
            }
            .#{$baseSelector}center-point {
                @extend .pos-half;
                background: linear-gradient(135deg,#e29987 10%,#ec2b09 90%);
                width: 10px;
                height: 10px;
                &::after {
                    content:"";
                    @extend .pos-half;
                    width: 5px;
                    height: 5px;
                    background-color: $darkColor;
                }
            }
        }
        .#{$baseSelector}time {
            font-size: 35px;
            @include m("-top",15,px);
            @include m("-bottom",15,px);
        }
        .#{$baseSelector}date {
            font-size: 15px;
            .#{$baseSelector}circle {
                @extend .dark-style;
                width: 22px;
                height: 22px;
                line-height: 16px;
                text-align: center;
                @include m("-right",3,px);
                @include m("-left",2,px);
                @include p(null,3,px);
                box-sizing: border-box;
                display: map-get($display, "inline-block");
                border-radius: percentage(.5);
            }
        }
    }
</style>
