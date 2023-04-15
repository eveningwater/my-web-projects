<template>
  <div id="app">
    <ewFamilyTree :treeData="getTreeData" />
  </div>
</template>

<script>
import ewFamilyTree from './components/ewFamilyTree.vue';
import { testData } from './data';
export default {
  name: 'app',
  data() {
    return {};
  },
  computed: {
    getTreeData() {
      const data = testData.object[0];
      return data;
    }
  },
  components: {
    ewFamilyTree
  }
};
</script>

<style></style>
