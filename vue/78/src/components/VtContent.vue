<template>
    <section class="vt-content">
        <textarea class="vt-textarea" placeholder="请输入你要翻译的单词或语句" v-model="word"></textarea>
        <textarea class="vt-textarea" placeholder="翻译结果" disabled v-model="result"></textarea>
    </section>
</template>
<script>
    export default {
        name:"VtFooter",
        data(){
            return {
                word:"",
                result:""
            }
        },
        mounted(){
            window.getTransLateCallback = this.getTransLateCallback;
        },
        methods:{
            getTransLateCallback(res){
                if(res.error_code){
                    return this.$message.error(this.res.error_msg);
                }
                this.result = res.trans_result[0].dst;
            }
        }
    }
</script>