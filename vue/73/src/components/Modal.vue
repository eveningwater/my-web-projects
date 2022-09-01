<script setup lang="ts">
import { PropType, toRefs } from 'vue';
import clickOutside from "../directives/clickOutside";
const props = defineProps({
    modelValue: Boolean as PropType<boolean>,
    title: String as PropType<string>,
    content: String as PropType<string>,
    hasFooter: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    isRenderContentHTML: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    maskCloseable: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    cancelText: {
        type: String as PropType<string>,
        default: "取消"
    },
    okText: {
        type: String as PropType<string>,
        default: "确认"
    },
    align: {
        type: String as PropType<string>,
        default: 'right',
        validator: (v: string) => {
            return ['left', 'center', 'right'].includes(v);
        }
    },
    container: {
        type: String as PropType<string>,
        default: 'body'
    }
});
const emit = defineEmits(['update:modelValue', 'on-ok','on-cancel']);
emit('update:modelValue');
const { modelValue, title, content, hasFooter, cancelText, okText, align, container, maskCloseable,isRenderContentHTML } = toRefs(props);
const onClickOutsideHandler = () => {    
    if (maskCloseable.value) {
        emit('update:modelValue', false);
    }
}
const VClickOutside = clickOutside;
const onCancelHandler = () => {
    emit('update:modelValue',false);
    emit('on-cancel');
}
const onOkHandler = () => {
    emit('on-ok');
}
</script>
<template>
    <teleport :to="container">
        <Transition name="modal">
            <div v-if="modelValue" class="icg-modal-mask">
                <div class="icg-modal-wrapper">
                    <div class="icg-modal-container" v-click-outside="onClickOutsideHandler">
                        <div class="icg-modal-header" v-if="title">
                            <slot name="header">{{ title }}</slot>
                        </div>
                        <div class="icg-modal-body" v-if="content">
                            <slot name="body">
                                <p v-if="isRenderContentHTML" v-html="content"></p>
                                <template v-else>{{ content }}</template>
                            </slot>
                        </div>
                        <div class="icg-modal-footer" v-if="hasFooter" :class="{ ['text-' + align]: true }">
                            <slot name="footer">
                                <button class="icg-modal-footer-btn" @click="onCancelHandler">{{
                                        cancelText
                                }}</button>
                                <button class="icg-modal-footer-btn primary" @click="onOkHandler">{{ okText
                                }}</button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </teleport>
</template>

<style lang="scss" scoped>
$btnBorderColor: #c4c4c4;
$primaryBgColor: linear-gradient(135deg, #82f377 10%, #31d810 90%);
$primaryHoverBgColor: linear-gradient(135deg, #a4f19d 10%, #29cf07 90%);
$btnHoverColor: #3ae740;
$btnHoverBorderColor:#2ceb32;
.#{$prefix}modal-mask {
    @include setProperty(background-color, fade-out($black, .5));
    @include setProperty(position, fixed);
    @include setProperty(z-index, 2000);
    @include setProperty(top, 0);
    @include setProperty(left, 0);
    @include setProperty(bottom, 0);
    @include setProperty(right, 0);
    @include setProperty(transition, all .2s ease-in-out);

    .#{$prefix}modal-wrapper {
        @extend .flex-center;
        @include setProperty(height, percentage(1));

        .#{$prefix}modal-container {
            @include setProperty(min-width, 300px);
            @include setProperty(margin, 0 auto);
            @include setProperty(background-color, $white);
            @include setProperty(border-radius, 4px);
            @include setProperty(transition, all .2s ease-in-out);
            @include setProperty(box-shadow, 0 1px 6px fade-out($black, .67));

            .#{$prefix}modal-header {
                @include setProperty(padding, 20px 30px);
                @include setProperty(border-bottom, 1px solid fade-out($white, .65));
                @include setProperty(color, fade-out($black, .15));
            }

            .#{$prefix}modal-body {
                @include setProperty(padding, 20px 30px);
            }

            .#{$prefix}modal-footer {
                @include setProperty(padding, 20px 30px);

                &.text-left {
                    @include setProperty(text-align, left);
                }

                &.text-center {
                    @include setProperty(text-align, center);
                }

                &.text-right {
                    @include setProperty(text-align, right);
                }

                &-btn {
                    @include setProperty(outline, none);
                    @include setProperty(display, inline-block);
                    @include setProperty(background, transparent);
                    @include setProperty(border, 1px solid $btnBorderColor);
                    @include setProperty(border-radius, 8px);
                    @include setProperty(padding, 8px 12px);
                    @include setProperty(color, fade-out($black, .15));
                    @include setProperty(letter-spacing, 2px);
                    @include setProperty(font-size, 14px);
                    @include setProperty(font-weight, 450);
                    @include setProperty(cursor, pointer);
                    @include setProperty(transition, background .3s cubic-bezier(.123, .453, .56, .89));

                    &:first-child {
                        @include setProperty(margin-right, 15px);
                    }
                    &:hover {
                        @include setProperty(color,$btnHoverColor);
                        @include setProperty(border-color,$btnHoverBorderColor);
                    }
                    &.primary {
                        @include setProperty(background, $primaryBgColor);
                        @include setProperty(color, $white);

                        &:hover {
                            @include setProperty(background, $primaryHoverBgColor);
                        }
                    }
                }
            }
        }
    }
}

.baseModalStyle {
    @include setProperty(transform, scale(1));
}

.modal-enter-from {
    @include setProperty(opacity, 0);

    .#{$prefix}modal-container {
        @extend .baseModalStyle;
    }
}

.modal-leave-to {
    @include setProperty(opacity, 0);

    .#{$prefix}modal-container {
        @extend .baseModalStyle;
    }
}
</style>
