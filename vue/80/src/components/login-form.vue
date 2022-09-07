<template>
    <el-card  shadow="always" class="login-form">
        <div slot="header">
            <h3>{{ loginLang['login-title'] }}</h3>
            <div class="lang-tab">
                <div class="lang-tab-item" @click="changeLangHandler">{{ langTabItem }}</div>
            </div>
        </div>
        <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="80px">
            <el-form-item prop="username" :label="loginLang['username-content']">
                <el-input  v-model="loginForm.username" autocomplete="off" :placeholder="loginLang['user-placeholder']"></el-input>
            </el-form-item>
            <el-form-item prop="password" :label="loginLang['password-content']">
                <el-input  type="password" v-model="loginForm.password" autocomplete="off" :placeholder="loginLang['password-placeholder']"></el-input>
            </el-form-item>
            <el-form-item label-width="0">
                <el-button type="primary" class="login-btn" @click="onHandleLogin('loginForm')">{{ loginLang['login-btn-content'] }}</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import { saveLocalStorage } from '../utils/storage';
export default {
    name:"ElLoginForm",
    data(){
        const loginLang = this.$langStore.langConfig.login;
        const userMessage = loginLang['user-placeholder'] || "";
        const passwordMessage = loginLang['password-placeholder'] || "";
        return {
            loginForm:{
                username:"",
                password:""
            },
            loginRules:{
                username: [
                    { required: true, message:userMessage, trigger: 'blur' }
                ],
                password: [
                    { required: true, message:passwordMessage, trigger: 'blur' }
                ]
            }
        }
    },
    computed:{
        loginLang(){
            return this.$langStore.langConfig.login;
        },
        langTabItem(){
            return this.currentLang === 'en' ? '中' : 'en';
        },
        currentLang(){
            return this.$langStore.lang;
        }
    },
    mounted(){
        window.addEventListener('keydown',e => {
            // enter键
            if(e.keyCode === 13){
                this.onHandleLogin('loginForm');
            }
        })
    },
    methods:{
        onHandleLogin(formName){
            this.$refs[formName].validate(valid => {
                if(valid){
                    // this.$post("/login")
                    saveLocalStorage('userInfo',{
                        ...this.loginForm,
                        token:"123"
                    });
                    this.$router.push("/");
                }
            })
        },
        changeLangHandler(){
            if(this.currentLang === 'en'){
                this.$requestLangConfig('zh');
            }else{
                this.$requestLangConfig('en');
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .login-form {
        position: absolute;
        right: 35px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 15px;
        min-width: 300px;
        min-height: 250px;
        padding: 15px;
        .login-btn {
            width: 100%;
        }
        .lang-tab {
            position: absolute;
            right: 15px;
            top: 15px;
            &-item {
                color:rgba(0,0,0,.85);
                font-size: 16px;
                cursor: pointer;
            }
        }
    }
</style>