const treeList = [
    {
        label: "一级导航1",
        children: [
            {
                label: "二级导航1-1",
                children: [
                    {
                        label: "三级导航1-1-1"
                    },
                    {
                        label: "三级导航1-1-2"
                    },
                    {
                        label: "三级导航1-1-3"
                    }
                ]
            },
            {
                label: "二级导航1-2",
                children: []
            },
            {
                label: "二级导航1-3",
                children: [
                    {
                        label: "三级导航1-3-1"
                    },
                    {
                        label: "三级导航1-3-2"
                    },
                    {
                        label: "三级导航1-3-3"
                    }
                ]
            }
        ]
    }
];
const app = Vue.createApp({
    setup() {
        const state = Vue.reactive({
            treeList: treeList
        });
        function onClickNode(value) {
            console.log(value)
        }
        return {
            state,
            onClickNode
        }
    }
});
app.component('ew-tree-item', {
    props: {
        model: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    created() {
        this.model.__isFolder = false;
    },
    template: `<div class="ew-tree-list-item">
      <span class="ew-tree-item-folder" :class="{ 'is-folder':model.__isFolder }"
      @click="onClickNode(model)" v-visible="model.children && model.children.length">
        {{ model.children && model.children.length ? model.__isFolder ? '-' : '+' : ''}}
      </span>
      <span class="ew-tree-item-content" @click="onClickNode(model)" :class="{'no-folder':!model.children || !model.children.length }">{{ model.label }}</span>
      <div class="ew-tree-children" v-if="model.children && model.children.length" v-show="model.__isFolder">
        <ew-tree-item v-for="(item,index) in model.children" :key="index + item.label" :model="item" @on-click-node="$emit('on-click-node',item)"></ew-tree-item>
      </div>
    </div>`,
    methods: {
        onClickNode(value) {
            value.__isFolder = !value.__isFolder;
            this.$emit('on-click-node', value)
        }
    }
})
app.component('ew-tree', {
    template: `
      <div class="ew-tree-list">
        <template v-for="(item,index) in treeData" :key="index + item.label">
          <ew-tree-item :model="item" @on-click-node="$emit('on-click-node',item)"></ew-tree-item>
        </template>
      </div>
    `,
    props: {
        treeData: {
            type: Array,
            default: () => {
                return []
            }
        }
    }
});
app.directive('visible', {
    mounted(el, binding) {
        el.style.visibility = binding.value ? 'visible' : 'hidden';
    }
});
app.mount('#app');