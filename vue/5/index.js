// 树组件
Vue.component('ew-tree', {
    template: `
    <ul class="l_tree">
        <li class="l_tree_branch" v-for="item in model" :key="item.id">
            <div class="l_tree_click">
                <button type="button" class="l_tree_children_btn" v-if="item.children"  @click="toggle(item)">{{ !item.show ? '-' : '+' }}</button>
                <span class="l_folder">{{ item.name }}</span>
            </div>
            <ew-tree v-show="!item.show" v-if="item.children" :model="item.children"></ew-tree>
        </li>
    </ul>`,
    props: {
        model: {}
    },
    methods: {
        toggle: function (item) {
            var idx = this.model.indexOf(item)
            Vue.set(this.model[idx], 'show', !item.show)
        }
    }
});
new Vue({
    el: "#demo",
    data() {
        return {
            testData: [
                {
                    name: "一级菜单",
                    children: [
                        {
                            name: '二级菜单',
                            children: [
                                {
                                    name: '三级菜单'
                                },
                                {
                                    name: '三级菜单'
                                }
                            ]
                        },
                        {
                            name: '二级菜单',
                            children: [
                                {
                                    name: '三级菜单',
                                    children: [
                                        {
                                            name: '四级菜单'
                                        },
                                        {
                                            name: '四级菜单'
                                        },
                                        {
                                            name: '四级菜单'
                                        }
                                    ]
                                },
                                {
                                    name: '三级菜单',
                                    children: [
                                        {
                                            name: '四级菜单',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: '二级菜单',
                            children: [
                                {
                                    name: '三级菜单'
                                },
                                {
                                    name: '三级菜单'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
})