<template>
    <div class="ic-carousel-container" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <transition @transitionend="onTransitionEndHandler">
            <div class="ic-carousel" ref="carouselContainer">
                <div class="ic-carousel-slide"
                    :style="{ transform: `translateX(-${currentWidth * currentActive}px)`, transitionDuration: `${show ? duration : 0}ms` }">
                    <CarouselItem v-for="item in items" :key="item.key" :src="item.src" :alt="item.alt" />
                </div>
                <div class="ic-carousel-dot-group" v-if="showDot">
                   <span v-for="(item, index) in items" :key="item.key" class="ic-carousel-dot"
                    :class="{ 'active': +currentActive === +item.key }"
                    v-show="(index !== 0 && index !== items.length - 1)"
                    @click="onDotClickHandler(item.key)"></span>
                </div>
            </div>
        </transition>
        <div class="ic-carousel-button-group">
            <button class="ic-carousel-button ic-button-prev" @click="onClickHandler(1)">{{ prevText }}</button>
            <button class="ic-carousel-button ic-button-next" @click="onClickHandler(2)">{{ nextText }}</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, PropType, ref, useSlots, VNode, VNodeArrayChildren } from 'vue';
import { debounce } from '../utils/const';
import { CarouselLists } from '../utils/type';
import CarouselItem from './CarouselItem.vue';
const props = defineProps({
    defaultIndex: {
        type: [String, Number] as PropType<string | number>,
        default: 0
    },
    loop: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    duration: {
        type: Number as PropType<number>,
        default: 1000
    },
    hoverPaused: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    showButtons: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    prevText: {
        type: String as PropType<string>,
        default: "上一张"
    },
    nextText: {
        type: String as PropType<string>,
        default: "下一张"
    },
    showDot: {
        type: Boolean as PropType<boolean>,
        default: false
    }
});
const carouselContainer = ref(null);
const currentWidth = ref(0);
const currentActive = ref((+props.defaultIndex || 0) + 1);
const currentDotActive = ref((+props.defaultIndex || 0) + 1);
const items = ref<CarouselLists[]>([]);
const show = ref(true);
const isClicked = ref(false);
let timer: NodeJS.Timeout;
const run = () => {
    if (!props.loop) {
        return
    }
    show.value = true;
    if (show.value) {
        if (+currentActive.value > items.value.length - 2 || +currentActive.value < 1) {
            needChangeKey(currentActive.value);
        }
        currentActive.value++;
    }
    timer = setTimeout(debounce(run, 300), Math.min(3000, props.duration));
}

const onMouseEnter = () => {
    if (props.hoverPaused) {
        clearTimeout(timer);
    }
}
const onMouseLeave = () => {
    if (props.hoverPaused || isClicked.value) {
        run();
    }
}
const needChangeKey = (key: string | number) => {
    if (+key > items.value.length - 2) {
        currentActive.value = 1;
        show.value = false;
    }
    if (+key < 1) {
        currentActive.value = items.value.length - 2;
        show.value = false;
    }
}
const onTransitionEndHandler = () => {
    needChangeKey(currentActive.value);
}
const nextHandler = () => {
    if (show.value) {
        currentActive.value++;
    }
}
const onClickHandler = debounce((type: number) => {
    if (timer) {
        clearTimeout(timer);
    }
    show.value = true;
    if (show.value) {
        if (type === 1) {
            currentActive.value--;
        }
        if (type === 2) {
            nextHandler()
        }
    }
    isClicked.value = true;
}, 300)
const onDotClickHandler = debounce((key: string | number) => {
    if (timer) {
        clearTimeout(timer);
    }
    if (+key > items.value.length - 2 || +key < 1) {
        needChangeKey(+key);
    } else {
        currentActive.value = +key;
    }
    isClicked.value = true;
}, 300)
onMounted(() => {
    if (carouselContainer) {
        currentWidth.value = (carouselContainer.value as unknown as HTMLDivElement).offsetWidth;
        const [item] = (useSlots().default || (() => ([])))() as VNodeArrayChildren;
        const children = (item as VNode)?.children as VNodeArrayChildren;
        const filterChildren = children?.filter(item => (item as VNode)?.props?.key && (item as VNode)?.props?.src).map((item, index) => ({
            key: index + 1 + '',
            src: (item as VNode)?.props?.src,
            alt: (item as VNode)?.props?.alt || ''
        }));
        items.value = [...filterChildren.slice(-1), ...filterChildren, ...filterChildren.slice(0, 1)];
        run();
    }
})
</script>
<style scoped lang="scss">
.#{$baseSelector}carousel-container {
    @include setProperty(max-width, 100%);
    @include setProperty(width, 500, px);
    @include setProperty(box-shadow, 0 1px 2px 12px rgba(255, 255, 255, .4));
    @include setProperty(border-radius, 8px);
    @include setProperty(overflow, hidden);

    .#{$baseSelector}carousel {
        @include setProperty(position, relative);
        @include setProperty(width, 100%);

        &-slide {
            @include setProperty(display, flex);
            @include setProperty(transition, transform .5s ease-in-out);
            @include setProperty(width, 100%);
        }
    }

    .#{$baseSelector}carousel-dot-group {
        @include setProperty(position, absolute);
        @include setProperty(bottom, 10px);
        @include setProperty(left, 0);
        @include setProperty(width, 100%);
        @include setProperty(display, flex);
        @include setProperty(align-items, center);
        @include setProperty(justify-content, center);
        .#{$baseSelector}carousel-slide {
           @include setProperty(display, flex);
           @include setProperty(width, auto);
        }
        .#{$baseSelector}carousel-dot {
            @include setProperty(width, 15px);
            @include setProperty(height, 15px);
            @include setProperty(display, block);
            @include setProperty(background, transparent);
            @include setProperty(border, 1px solid #fff);
            @include setProperty(border-radius, 15px);
            @include setProperty(margin-right, 6px);
            @include setProperty(cursor, pointer);
            @include setProperty(transition, transform .5s ease-in-out);

            &.active {
                @include setProperty(background, #fff);
            }
        }
    }


    .#{$baseSelector}carousel-button-group {
        @include setProperty(display, flex);
        @include setProperty(justify-content, space-between);

        .#{$baseSelector}carousel-button {
            @include setProperty(display, inline-block);
            @include setProperty(width, 50%);
            @include setProperty(border, none);
            @include setProperty(cursor, pointer);
            @include setProperty(padding, .5rem);
            @include setProperty(color, #fff);
            @include setProperty(background, linear-gradient(135deg, #c368ee 10%, #a921e9 90%));
            @include setProperty(transition, all .3s ease-in-out);

            &:hover {
                @include setProperty(background, linear-gradient(135deg, #d182f5 10%, #bb3ef5 90%));
            }
        }
    }
}
</style>