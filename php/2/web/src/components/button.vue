<template>
    <button :type="nativeType" :class="setButtonClass" class="exam-btn" @click="$emit('click')">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name:"exam-button",
    props:{
        nativeType:{
            type:String,
            default:''
        },
        type:{
            type:String,
            default:''
        },
        size:{
            type:String,
            default:"default"
        },
        isLong:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            
        }
    },
    computed:{
        setButtonClass(){
            let res = '';
            if(this.type)res += 'exam-'+this.type+'-btn';
            if(this.isLong)res += ' exam-long-btn';
            if(this.size)res += ' exam-'+ this.size + '-btn';
            return res;
        }
    }
}
</script>  