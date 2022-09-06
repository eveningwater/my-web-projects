<template>
    <el-menu>
        <el-submenu v-for="(menu,index) in menuList" :key="menu.title + index" :index="menu.id">
            <template slot="title">
                <i :class="menu.icon"></i>
                <span>{{ menu.title }}</span>
            </template>
            <el-menu-item-group 
                v-for="(group,groupIndex) in menu.children" 
                :key="group.groupTitle + groupIndex" 
                :index="group.id"
            >
                <template slot="title">
                    <i :class="group.groupIcon"></i>
                    <span>{{ group.groupTitle }}</span>
                </template>
                <el-menu-item v-for="sub in group.children" :key="sub.subTitle" :index="sub.id">
                    <i :class="sub.subIcon"></i>
                    <span>{{ sub.subTitle }}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>
<script>
export default {
    name:"ElLeftMenu",
    data(){
        return {
            menuList:[
                {
                    id:"1",
                    title:"首页",
                    icon:"el-icon-message",
                    children:[
                        {
                            id:"1-1",
                            groupTitle:"面板",
                            groupIcon:"el-icon-message",
                            children:[
                                {
                                    id:"1-1-1",
                                    subTitle:"表格分析",
                                    subIcon:"el-icon-message"
                                },
                                {
                                    id:"1-1-2",
                                    subTitle:"柱图分析",
                                    subIcon:"el-icon-message"
                                }
                            ]
                        }
                    ]
                },
                {
                    id:"2",
                    title:"用户管理",
                    icon:"el-icon-user-solid",
                    children:[
                        {
                            id:"2-1",
                            subTitle:"添加用户",
                            subIcon:"el-icon-plus"
                        }
                    ]
                }
            ]
        }
    }
}
</script>