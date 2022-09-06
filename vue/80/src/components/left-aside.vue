<template>
    <el-aside width="200px">
        <slot></slot>
        <el-left-menu></el-left-menu>
    </el-aside>
</template>
<script>
import ElLeftMenu from './left-menu.vue';
export default {
    name:"ElLeftSide",
    components:{ElLeftMenu},
    data(){
        return {

        }
    }
}
</script>