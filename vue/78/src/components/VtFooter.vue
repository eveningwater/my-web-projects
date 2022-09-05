<template>
    <footer class="vt-footer">
         <button type="button" class="vt-btn" :class="{ 'checked':(currentType === 'translate')}" @click="onClickHandler('translate')">翻译</button>
         <button type="button" class="vt-btn" :class="{ 'checked':(currentType === 'clear')}" @click="onClickHandler('clear')">清除</button>
    </footer>
</template>
<script>
    export default {
        name:"VtFooter",
        data(){
            return {
                currentType:""
            }
        },
        methods:{
            onClickHandler(type){
                this.currentType = type;
                this.$emit("on-click",type);
            }
        }
    }
</script>