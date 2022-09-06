<template>
    <div class="home">
        <el-container>
            <el-left-side>
                <div class="logo">
                    <img src="../assets/logo.png" alt="图片加载中" class="logo-img"/>
                </div>
            </el-left-side>
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown trigger="click" @command="onCommandHandler">
                        <div class="el-dropdown-link">
                            <i class="el-icon-setting" style="margin-right: 15px"></i>
                            <span>eveningwater</span>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="0">查看</el-dropdown-item>
                            <el-dropdown-item command="1">新增</el-dropdown-item>
                            <el-dropdown-item command="2">删除</el-dropdown-item>
                            <el-dropdown-item command="3">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <el-main>
                    <el-table :data="tableData">
                        <el-table-column prop="date" label="日期" width="140">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="120">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                    </el-table>
                    <el-button @click="visible = true" class="role-btn">权限设置</el-button>
                </el-main>
            </el-container>
        </el-container>
        <form-tree v-model="visible"></form-tree>
    </div>
</template>
<script>
import ElLeftSide from '../components/left-aside.vue';
import FormTree from '../components/form-tree.vue';
import { deleteLocalStorage } from '../utils/storage';
export default {
    name: "Home",
    components: { ElLeftSide, FormTree },
    data() {
        return {
            tableData: [
                {
                    date: "2021-06-08",
                    name: "eveningwater",
                    address: "四川成都"
                },
                {
                    date: "2021-06-08",
                    name: "eveningwater",
                    address: "四川成都"
                },
                {
                    date: "2021-06-08",
                    name: "eveningwater",
                    address: "四川成都"
                },
                {
                    date: "2021-06-08",
                    name: "eveningwater",
                    address: "四川成都"
                },
                {
                    date: "2021-06-08",
                    name: "eveningwater",
                    address: "四川成都"
                }
            ],
            visible: false
        }
    },
    methods: {
        onCommandHandler(dir) {
            console.log(dir);
            switch (dir) {
                case '3':
                    this.$confirm("确定要退出登录吗?", '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push('/login');
                        deleteLocalStorage('userInfo');
                    }).catch(() => {});
                    break;
            }
        }
    }
}
</script>
<style lang="less" scoped>
.home {
    width: 100%;
    height: 100%;

    .el-container {
        height: 100%;

        .logo {
            height: 60px;
            width: 200px;
            background-color: #fefefe;
            border-bottom: 1px solid #dedfde;
            display: flex;
            justify-content: center;
            align-items: center;
            &-img {
                width: 45px;
                height: 45px;
                object-fit: cover;
            }
        }

        .role-btn {
            margin-top: 15px;
        }
    }

    .el-header {
        background-color: #eaedf0;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #545553;
        background-color: #eaedf0;
    }
}
</style>