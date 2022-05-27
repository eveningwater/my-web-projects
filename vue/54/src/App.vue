<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { computed, defineAsyncComponent, ref, toRefs } from 'vue';
import dataObject from './utils/data';
import type { PasswordType,DataType } from './utils/data';
import { getRandom } from "./utils/util";
const AsyncTab = defineAsyncComponent(() => import("@/components/Tab.vue"));
const AsyncTitle = defineAsyncComponent(() => import("@/components/Title.vue"));
const AsyncIcon = defineAsyncComponent(() => import("@/components/Icon.vue"));
type RandomFuncType = {
    upper:Function;
    lower:Function;
    number:Function;
    symbol:Function;
}
const randomFunc = {
    upper:getRandom(26,65),//26 letters,the first letter code (eg:A) is 65
    lower:getRandom(26,97),//26 letters,the first letter code (eg:a) is 97
    number:getRandom(10,48),//10 numbers,the first number code (eg:0) is 48
    symbol:() => {
        const symbols = '!@#$%^&*(){}[]=<>/,.';
        return symbols[Math.floor(Math.random() * symbols.length)];
    }
}
const currentLang = ref("en");
const data = computed(() => dataObject[currentLang.value as keyof DataType] as PasswordType);
const settingValues = ref<[number,boolean,boolean,boolean,boolean]>([
   20,
   false,
   false,
   false,
   false
]);
const password = ref("");
const generatePassword = (upper:boolean,lower:boolean,number:boolean,symbol:boolean,length:number) => {
    let generate_password = "";
    const typeCount = Number(upper) + Number(lower) + Number(number) + Number(symbol);
    const typeFunc = [{upper},{lower},{number},{symbol}].filter(v => Object.values(v)[0]);
    if(typeCount === 0){
        return (window as any).$message.warning((data.value as unknown as PasswordType).typeText);
    }
    for(let i = 0;i < length;i += typeCount){
        typeFunc.forEach(type => {
            const func_name = Object.keys(type)[0] as keyof RandomFuncType;
            generate_password += randomFunc[func_name]();
        })
    }
    password.value = generate_password.slice(0,length);
}
const onTabClickHandler = (v:string) => currentLang.value = v;
const onSettingHandler = (e:Event,idx:number) => {
    if(idx === 0){
       const v = (e.target as HTMLInputElement).value;
       if(Number(v) <= 0){
          settingValues.value[idx] = 1;
       }else if(Number(v) >= 20){
          settingValues.value[idx] = 20;
       }else{
          settingValues.value[idx] = 10;
       }
    }
}
const generatePasswordHandler = () => {
    const [length,upper,lower,number,symbol] = settingValues.value;
    generatePassword(upper,lower,number,symbol,length);
}
const confirm = () => {
    (window as any).ewConfirm({
        title:data.value.confirmTitle,
        content:data.value.confirmContent,
        showCancel:false
    })
}
const onCopyHandler = () => {
    if(!password.value){
        return (window as any).$message.warning(data.value.confirmWarning);
    }
    // `navigator.clipboard.writeText` not working in wechat browser.
    if(navigator.userAgent.toLowerCase().indexOf('micromessenger') === -1){
      navigator.clipboard.writeText(password.value).then(() => confirm())
    }else{
        const input = document.createElement("input");
        input.value = password.value;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
        confirm();
    }
}
</script>

<template>
    <async-tab @on-tab-click="onTabClickHandler" :lang="currentLang"></async-tab>
    <div class="pg-box">
        <async-title level="2" class="pg-box-title">{{ data.title }}</async-title>
        <div class="pg-box-result">
            <span class="pg-box-result-text">{{ password }}</span>
            <button class="pg-box-result-btn" type="button" @click="onCopyHandler">
                <async-icon type="clipboard"></async-icon>
            </button>
        </div>
        <div class="pg-box-setting-list">
            <div class="pg-box-setting-list-item" v-for="(item,index) in data['settings']" :key="item.label + index">
                <label class="pg-box-setting-list-item-label">{{ item.label }}</label>
                <input :type="item.type" class="pg-box-setting-list-item-input" v-model="settingValues[index]" @change="onSettingHandler($event,index)"/>
            </div>
        </div>
        <button class="pg-box-btn" type="button" @click="generatePasswordHandler">{{ data.btnContent }}</button>
    </div>
</template>

<style lang="scss">
  @import "./style/app.scss";
</style>
