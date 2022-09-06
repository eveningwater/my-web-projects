<template>
    <div class="login-container">
        <el-login-form></el-login-form>
    </div>
</template>
<script>
import ElLoginForm from '../components/login-form.vue';
export default {
    name:"Login",
    components:{ ElLoginForm },
    data(){
        return {
            
        }
    }
}
</script>
<style lang="less" scoped>
    .login-container {
        width: 100%;
        height: 100%;
        background: url('~@/assets/login_bg.jpg')no-repeat center / cover;
        position: relative;
    }
</style>