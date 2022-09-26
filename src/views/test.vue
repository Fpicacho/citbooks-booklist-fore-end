<template>
  <a-tree
    :tree-data="state.treeData"
    :block-node="true"
    @check="clickTreeNode"
    :checkable="true"
  ></a-tree>
</template>
<script setup>
import { reactive, } from "vue";
const state = reactive({
  treeData: [
    {
      title: "12300",
      key: "1",
      children: [
        { title: "2", key: "1-2" },
        { title: "3", key: "1-3" },
      ],
    },
    {
      title: "嘿嘿",
      key: "2",
      children: [
        { title: "嘿2", key: "2-2" },
        { title: "嘿3", key: "2-3" },
      ],
    },
  ],
});
function clickTreeNode(node, enent) {
  console.log(node);
  console.log(enent.halfCheckedKeys);
}
</script>
