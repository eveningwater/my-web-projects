<script setup lang="ts">
    import { computed, ref } from "@vue/reactivity";
    import { isString } from "@vue/shared";
    import { marked } from "marked";
    import { nextTick, PropType, watch } from "vue";
    import type { DataType } from "../utils/dataType";
    interface TextAreaElementType extends HTMLTextAreaElement {
        createTextRange?:Function;
    }
    const props = defineProps({
        item:Object as PropType<DataType>
    });
    const emit = defineEmits(["on-update-data","on-delete-data"])
    const text = ref("");
    const isNoteEdit = ref(false);
    const noteContent = computed(() => marked(text.value));
    const cardTextarea = ref(null);
    watch(() => props.item,val => {
         if(isString(val?.content)){
            text.value = val?.content as string;
         }
         if(typeof val?.isEdit === "boolean"){
            isNoteEdit.value = val.isEdit;
         }
    },{ immediate:true });
    const onEditHandler = () => {
        isNoteEdit.value = true;
        nextTick(() => {
            if(cardTextarea.value){
                const el = cardTextarea.value as TextAreaElementType;
                el.focus();
                if(el.setSelectionRange){
                    el.setSelectionRange(el.value.length,el.value.length);
                }else if(el.createTextRange){
                    const range = el.createTextRange();
                    range.collapse(true);
                    range.moveEnd("character",el.value.length);
                    range.moveStart("character",el.value.length);
                    range.select();
                }
            }
        })
    }
    const onBlurHandler = () => {
        isNoteEdit.value = false;
        emit("on-update-data",Object.assign(props.item || {},{ content:text.value,isEdit:isNoteEdit.value }));
    }
    const onDeleteHandler = () => {
        if(typeof (window as any).ewConfirm === "function"){
            (window as any).ewConfirm({
                title:"温馨提示",
                content:"确定要删除该卡片吗?",
                sure(ctx:any){
                    ctx.close(300);
                    emit("on-delete-data",props.item?.uuid);
                },
                showCancel:true
            });
        }
        
    }
</script>
<template>
    <div class="na-note">
        <div class="na-note-tool">
            <i class="na-note-tool-btn fas fa-edit" @click="onEditHandler"></i>
            <i class="na-note-tool-btn fas fa-trash-alt" @click="onDeleteHandler"></i>
        </div>
        <div class="na-note-content" v-html="noteContent"></div>
        <textarea class="na-note-textarea na-note-content" :class="{'hidden':!isNoteEdit }" ref="cardTextarea" v-model="text" @blur="onBlurHandler"></textarea>
    </div>
</template>
<style lang="scss" scoped>
    $noteBgColor:linear-gradient(135deg,#f1f0f1 10%,#fff);
    $noteToolBgColor:linear-gradient(135deg,#85a1f0 10%,#3285d3);
    $noteBoxShadow:0 0 13px rgba(0,0,0,.5);
    $noteContentColor:#3e3f3f;
    $focusBorderColor:#1428dd;
    .#{$baseSelector}note {
        @include background($noteBgColor);
        box-shadow: $noteBoxShadow;
        @include setComponent(border-radius,5,px);
        @include setComponent(width,400,px);
        @include setComponent(height,400,px);
        @include setComponent(margin-top,30,px);
        @include setComponent(margin-bottom,30,px);
        @include setComponent(margin-left,20,px);
        @include setComponent(margin-right,20,px);
        @include setComponentPercent(max-width,400);
        @extend .el-pos-r;
        &-tool {
            @extend .el-display-flex,.el-jc-flex-end;
            @include setComponent(padding,.5,rem);
            @include background($noteToolBgColor);
            &-btn {
                @include color($white);
                @extend .el-cursor-pointer;
                @include setComponent(margin-left,.5,rem);
                @include setComponent(font-size,1,rem);
                &:hover {
                    @include setComponent(opacity,.7,null);
                }
            }
        }
        &-content {
            @include color($noteContentColor);
            @include setComponentPercent(width,100);
            @include setComponent(padding,20,px);
            @include setComponent(height,calc(100% - 2rem),null);
            @extend .el-display-block;
        }
        &-textarea {
            @include setComponent(top,2,rem);
            @include setComponent(left,0,null);
            @include setComponent(font-size,16,px);
            @extend .el-pos-a;
            resize: none;
            &.hidden {
                @extend .el-display-none;
            }
            &:focus-visible {
                outline: none;
            }
            &:focus {
                border: {
                    width:1px;
                    style:solid;
                    color:$focusBorderColor;
                }
            }
        }
    }
</style>