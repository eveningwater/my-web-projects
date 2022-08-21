<template>
    <div class="va-container">
        <async-title level="2" class="va-container-title">Verify Your Account</async-title>
        <p class="va-container-content">
            We emailed you the six digit code to cool_guy@email.com
            <br>
            Enter the code below to confirm your email address.
        </p>
        <div class="va-container-code" ref="containerCode">
            <input class="va-container-code-input" v-for="item in codeList" :key="item.key" :value="item.value"
                :placeholder="item.placeholder" required type="number" min="0" max="9" />
        </div>
        <small class="va-container-footer">
            This is design only. We didn't actually send you an email as we don't have your email, right?
        </small>
    </div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { COUNT } from '../utils/const';

const AsyncTitle = defineAsyncComponent(() => import('./Title.vue'));
const codeList = ref<{ key: string, value: string, placeholder: string }[]>([]);
const containerCode = ref<HTMLDivElement>();
const onFocusHandler = (node: HTMLElement) => {
    if (!node) {
        return false;
    }
    const { nodeName } = node;
    if (nodeName && nodeName.toLowerCase() === 'input') {
        node.focus();
    }
}
onMounted(() => {
    for (let i = 0; i <= COUNT; i++) {
        codeList.value.push({
            key: i + '-' + (i + 1),
            value: '0',
            placeholder: '0'
        })
    }
    const codeContainer = containerCode.value;
    if (codeContainer) {
        const codeElements = Array.from(codeContainer.children);
        codeElements.forEach((item, index: number) => {
            item.addEventListener('keydown', e => {
                const event = e as KeyboardEvent;
                if (+event.key >= 0 && +event.key <= 9) {
                    codeList.value[index].value = '';
                    setTimeout(() => onFocusHandler(codeElements[index + 1] as HTMLInputElement), 0);
                } else {
                    setTimeout(() => onFocusHandler(codeElements[index + 1] as HTMLInputElement), 0);
                }
            })
        })
    }
})
</script>
<style lang="scss" scoped>
$containerBoxShadow: 0 3px 12px #6273df;
$containerBorderColor: #344553;
$containerBgColor: linear-gradient(135deg, #9bb1ec 10%, #132fe7 90%);
$white: #fff;
$contentColor: #fefefe;
$footerBgColor: linear-gradient(135deg, #aacef0 10%, #3091e0 90%);
$footerColor: #ececec;
$inputBorderColor: #f1f2f3;
$inputFocusBorderColor: #056bb9;
$inputValidBorderColor: #056bb9;
$inputValidBoxShadow: 0 2px 10px #da9c28;

.#{$baseSelector}container {
    @include setProperty(max-width, 1200px);
    @include setProperty(padding, 2em);
    @include setProperty(border-radius, 15px);
    @include setProperty(border, 3px solid $containerBorderColor);
    @include setProperty(text-align, center);
    @include setProperty(box-shadow, $containerBoxShadow);
    @include setProperty(background, $containerBgColor);

    &-title {
        @include setProperty(color, $white);
        @include setProperty(letter-spacing, 2px);
        @include setProperty(margin, 1em 0);
    }

    &-content {
        @include setProperty(color, $contentColor);
        @include setProperty(line-height, 1.5);
    }

    &-code {
        @include setProperty(display, flex);
        @include setProperty(flex-wrap, wrap);
        @include setProperty(margin, 20px 0);
        @include setProperty(justify-content, center);
        @include setProperty(align-items, center);

        &-input {
            @include setProperty(border, 1px solid $inputBorderColor);
            @include setProperty(margin, percentage(.01));
            @include setProperty(display, inline-block);
            @include setProperty(font-weight, 400);
            @include setProperty(width, 100px);
            @include setProperty(height, 100px);
            @include setProperty(border-radius, 4px);
            @include setProperty(font-size, 2em);
            @include setProperty(text-align, center);
            @include setProperty(outline, none);

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                @include setProperty(-webkit-appearance, none);
                @include setProperty(margin, 0);
            }

            &:valid {
                @include setProperty(border-color, $inputValidBorderColor);
                @include setProperty(box-shadow, $inputValidBoxShadow);
            }

            &:focus {
                @include setProperty(border-color, $inputFocusBorderColor);
                @include setProperty(box-shadow, none);
            }


        }
    }

    &-footer {
        @include setProperty(display, inline-block);
        @include setProperty(color, $footerColor);
        @include setProperty(background, $footerBgColor);
        @include setProperty(max-width, 400px);
        @include setProperty(border-radius, 6px);
        @include setProperty(padding, 20px);
    }
}
</style>