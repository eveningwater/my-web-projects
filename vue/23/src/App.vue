<script setup>
import Header from './components/Header.vue';
import Title from "./components/Title.vue";
import CodeEffect from './components/CodeEffect.vue';
import { ElRow,ElCol,ElInput,ElHeader,ElButton,ElFooter,ElLink,ElMessageBox } from 'element-plus';
import { nextTick, reactive } from 'vue-demi';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const state = reactive({ formData:{},code:"" })
const changeForm = (form) => {
   state.formData = {...form};
   nextTick(() => {
      const codeEffect = document.querySelector(".tri-element");
      const style = codeEffect.style.cssText;
      const templateStyle = `.tri-element {display: inline-block;border-style: solid;width: 0;height: 0;${style.replace(/\;(.*?)\:/g,w => w.slice(0,1) + w.slice(1).trim())}}`;
      state.code = templateStyle.replace(/\;/g,";\n").replace(/\{|\}/,w => w + "\n").replace(/((.*?)\:)/g,w => "     "+ w);
   })
}
const confirm = () => {
  ElMessageBox.alert(`CSS代码已复制,请粘贴查看!`,"温馨提示",{
     confirmButtonText:"确定",
     callback:() => {}
  })
}
const onCopyCodeHandler = () => {
  // `navigator.clipboard.writeText` not working in wechat browser.
  if(navigator.userAgent.toLowerCase().indexOf('micromessenger') === -1){
    navigator.clipboard.writeText(state.code).then(() => confirm())
  }else{
      const input = document.createElement("input");
      input.value = state.code;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      confirm();
  }
}
</script>

<template>
    <Header></Header>
    <main class="tri-main">
       <el-row class="tri-row">
          <el-col :span="12" class="tri-left tri-col">
            <Form @on-change="changeForm"></Form>
          </el-col>
          <el-col :span="12" class="tri-right tri-col">
            <code-effect :formData="state.formData"></code-effect>
          </el-col>
       </el-row>
       <el-row class="tri-row tri-code-row">
           <el-col :span="12" class="tri-left tri-col">
              <el-header class="tri-header tri-fcs">
                  <Title level="2">CSS代码</Title>
                  <el-button @click="onCopyCodeHandler">复制代码</el-button>
              </el-header>
              <el-input :autosize="{ minRows: 8, maxRows: 10 }" type="textarea" v-model="state.code" disabled></el-input>
           </el-col>
       </el-row>
       <el-footer class="tri-footer">
         inspired by <el-link href="http://49.234.61.19/tool/cssTriangle" target="_blank" type="primary" class="tri-link">在线三角形样式生成器</el-link>
         更多示例尽在<el-link href="https://eveningwater.com/my-web-projects/home/" target="_blank" type="primary" class="tri-link">我的个人项目集合</el-link>中。
       </el-footer>
    </main>
</template>
<style lang="less" scoped>
  .tri-main {
     display:flex;
     min-height: 600px;
     flex-direction: column;
     justify-content: center;
     width: 100%;
     min-width: 750px;
     max-width: 980px;
     margin: auto;
     .tri-left {
       background-color: #fff;
       box-shadow: 0 4px 12px rgba(255,255,255,.4);
       height: 350px;
       padding: 10px;
       border-radius: 2px;
     }
     .tri-header.tri-fcs {
       justify-content: space-between;
       padding: 0;
     }
     .tri-code-row {
       margin-top: 15px;
     }
     .tri-row {
       margin-left: -12.5px;
       margin-right: -12.5px;
       .tri-col {
          padding-left: 12.5px;
          padding-right: 12.5px;
       }
     }
     .tri-footer {
       align-items: center;
       display: flex;
       color: #535455;
       font-size: 14px;
       justify-content: center;
       flex-wrap: wrap;
       .tri-link {
         margin: 0 1%;
       }
     }
  }
  @media (max-width: 1000px) {
        .tri-left,.tri-right {
           width: 100%;
           flex:0 0 100%;
           max-width: 100%;
           overflow-x: hidden;
           .tri-code-effect {
             margin-top: 15px;
           }
        }
        .tri-main {
          padding: 10px 0;
          min-width: 300px;
          max-width: calc(100% - 20px);
          margin: 0 10px;
          overflow-x: hidden;
          .tri-row {
            min-width: 100%;
            max-width: 100%;
            margin: 0;
            &.tri-code-row {
              margin-top: 15px;
            }
            .tri-col:not(.tri-right) {
              padding: 10px;
            }
            .tri-col.tri-right {
              padding: 0;
            }
          }
        }
    }
</style>

