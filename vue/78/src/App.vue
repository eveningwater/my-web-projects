<template>
  <div id="app" class="vt-app">
      <main class="vt-main">
          <vt-header @on-change="onChangeHandler"></vt-header>
          <vt-content ref="vtContent"></vt-content>
          <vt-footer @on-click="onClickHandler"></vt-footer>
      </main>
  </div>
</template>

<script>
import VtHeader from './components/VtHeader.vue';
import VtContent from './components/VtContent.vue';
import VtFooter from './components/VtFooter.vue';
import { translate } from "./utils/util";
export default {
  name: 'app',
  components: {
    VtHeader,
    VtContent,
    VtFooter
  },
  data(){
     return {
         currentLang:"en"
     }
  },
  methods:{
     onChangeHandler(item){
        this.currentLang = item.value;
     },
     onClickHandler(type){
        const contentComp = this.$refs.vtContent;
        if(!contentComp){
           return;
        }
        if(type === "clear"){
            contentComp.word = "";
        }else {
            if(!contentComp.word.trim()){
               return this.$message.warning("请输入需要翻译的单词或语句!");
            }
            const s = document.querySelector("#translateScript");
            if(s){
               s.parentElement.removeChild(s);
            }
            translate(contentComp.word,this.currentLang);
        }
     }
  }
}
</script>

<style>
  @import url("./style/common.css");
</style>
