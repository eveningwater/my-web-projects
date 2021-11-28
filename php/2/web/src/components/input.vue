<template>
    <div :class="'exam-'+ tagType + '-wrapper'">
        <template v-if="tagType === 'input'">
            <input :type="type" class="exam-input" :class="'exam-input-' + size" />
        </template>
        <template v-else-if="tagType === 'textarea'">
            <textarea  :rows="row" class="exam-textarea" :style="{ height:col * 32 + 'px'}"></textarea>
        </template>
    </div>
</template>
<script>
export default {
    name:"examInput",
    props:{
        size:{
            type:String,
            default:"default"
        },
        type:{
            type:String,
            default:"text"
        },
        tagType:{
            type:String,
            default:"input"
        },
        row:{
            type:Number,
            default:2
        },
        col:{
            type:Number,
            default:4
        }
    },
    data(){
        return{

        }
    }
}
</script>>