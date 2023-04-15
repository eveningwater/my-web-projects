<template>
  <div class="ew-horizontal-tree-container">
    <div class="ew-horizontal-tree">
      <button class="ew-horizontal-tree-btn" type="button">{{ list.name }}</button>
      <div class="ew-horizontal-tree-children">
        <div class="ew-horizontal-tree-children-left" :style="{ width: `calc(${(100 / list.childList.length / 2) + '%'})`}"></div>
        <div class="ew-horizontal-tree-children-container" v-for="item in list.childList" :key="item.id" :style="{ width: 100 / list.childList.length + '%'}">
          <div class="ew-horizontal-tree-children-item">
            <button type="button" class="ew-horizontal-tree-children-item-folder-btn" @click="() => toggle(item)">{{ !item.show
                        ?
                        '-' : '+' }}</button>
            <button class="ew-horizontal-tree-children-item-btn" v-if="!item.show">{{ item.name }}</button>
          </div>
          <div class="ew-tree-container" v-if="!item.show">
            <ew-tree :model="item.childList" :dataKey="{ key:'id',name:'name',children:'childList',isFolder:'show' }"></ew-tree>
          </div>
        </div>
        <div class="ew-horizontal-tree-children-right" :style="{ width: `calc(${100 / list.childList.length / 2 + '%'})`}"></div>
      </div>
    </div>
  </div>
</template>
<script>
import ewTree from './ewTree.vue';
export default {
  name: 'ewFamilyTree',
  props: {
    treeData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const list = this.treeData;
    return {
       list
    };
  },
  methods: {
    toggle(item){
       const idx = this.list.childList.indexOf(item);
       this.$set(this.list.childList[idx],'show',!this.list.childList[idx].show)
    }
  },
  components: {
    ewTree
  }
};
</script>
<style >
.ew-horizontal-tree-container {
  padding: 1em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.ew-horizontal-tree {
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.ew-horizontal-tree-btn {
  background-color: #2396ef;
  display: inline-block;
  padding: 12px 24px;
  color: #fff;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  margin-bottom: 65px;
  position: relative;
}

.ew-horizontal-tree-btn:hover {
  background-color: #0e8eef;
}

.ew-horizontal-tree-children {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  top: 5px;
  background-color: #fff;
}

.ew-horizontal-tree-children-container {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  position: relative;
}
.ew-tree-container {
   position: absolute;
   left: 50%;
   top: 60px;
   width: 100%;
   margin-left: -48px;
}
.ew-horizontal-tree-children-item-btn {
  background-color: #d7d9db;
  display: inline-block;
  padding: 12px 24px;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
}
.ew-horizontal-tree-btn::before {
   content: "";
   height: 35px;
   width: 1px;
   background-color: #8c8e8f;
   position: absolute;
   left: 50%;
   top: 48px;
}
.ew-horizontal-tree-children::before {
  content: '';
  height: 1px;
  background-color: #8c8e8f;
  position: absolute;
  top: -30px;
  width: 100%;
}
.ew-horizontal-tree-children-left,.ew-horizontal-tree-children-right {
  height: 1px;
  background-color: #fff;
  position: absolute;
  top: -30px;
}
.ew-horizontal-tree-children-right {
  right: 0;
}
.ew-horizontal-tree-children-container::after {
   content:"";
   position: absolute;
   height: 25px;
   width: 1px;
   background-color: #8c8e8f;
   left: 50%;
   top: -30px;
}
.ew-horizontal-tree-children-item-folder-btn {
   display: block;
   width: 25px;
   height: 25px;
   background-color: transparent;
   border: 1px solid #b8b8b8;
   color: #7e7e7e;
   font-size: 18px;
   border-radius: 50%;
   margin: -5px auto 0; 
   cursor: pointer;
}
</style>
