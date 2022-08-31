<template>
  <!-- 主场页面 src\views\Home\HomeView.vue-->
  <div class="homeView">
    <div class="container">
      <!-- logo -->
      <div class="logoBox">
        <img src="../../assets/img/logo.png" alt="" />
        <span>CtiBooks项目中的一部分,线上书展服务。</span>
      </div>
      <!-- 搜索框 -->
      <div class="searchBox">
        <a-input-search
          v-model:value="searchValue"
          placeholder="按书名、作者、出版社、ISBN ...搜索"
          enter-button="搜索"
          size="large"
          @search="onSearch"
        />
        <span class="categorySearch" @click="onShowDrawer">按分类搜索</span>
      </div>
      <!-- 图书列表 -->
      <!-- 分页器 -->
      <!-- 分类抽屉 -->
      <a-drawer
        :width="310"
        title="分类搜索"
        placement="left"
        :visible="visible"
        @close="onShowDrawer"
      >
        <!-- 二级树 -->
        <a-tree
          v-if="state.treeData.length"
          :tree-data="state.treeData"
          :block-node="true"
          :defaultExpandAll="true"
          @select="clickTreeNode"
        />
      </a-drawer>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { message } from "ant-design-vue";
const searchValue = ref("");
const visible = ref(false);
const state = reactive({
  // 二级树数据
  treeData: [
    {
      title: "计算机",
      key: "computer",
      children: [
        {
          title: "编程语言",
          key: "computer-programming",
        },
        {
          title: "系统开发",
          key: "computer-systemDeveLopment",
        },
        {
          title: "编程算法",
          key: "computer-algorithm",
        },
      ],
    },
    {
      title: "小说",
      key: "Anovel",
      children: [
        {
          title: "武打",
          key: "Anovel-wuda",
        },
        {
          title: "武侠",
          key: "Anovel-wuxia",
        },
        {
          title: "科幻",
          key: "Anovel-kehuan",
        },
      ],
    },
  ],
});
// 搜索逻辑
function onSearch() {
  if (searchValue.value === "") {
    message.error("输入内容为空，请检查！");
    return;
  }
}
// 开启二级树逻辑
function onShowDrawer() {
  visible.value = !visible.value;
}
// 点击二级树节点逻辑
function clickTreeNode(node) {
  const reg = /-/g;
  if (reg.test(node[0])) {
    console.log(node[0]);
  }
}
</script>

<style lang="scss" scoped>
.homeView {
  background: #f6f6f6;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 970px;
    margin: 0 auto;
    padding: 0 15px;
    .logoBox {
      display: flex;
      flex-direction: column;
      width: 400px;
      text-align: center;
      margin-top: 50px;
      span {
        color: #90a5a8;
        font-weight: 400;
        padding: 4px 0 15px 0;
        font-style: italic;
      }
    }
    .categorySearch {
      display: inline-block;
      padding-top: 15px;
      border-bottom: 1px dashed;
      color: #777;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .searchBox {
    width: 100%;
  }
}

@media screen and (max-width: 1080px) {
  // 正常电脑分辨率
}
@media screen and (max-width: 1024px) {
  // 低分辨率屏幕或者平板横向
  .homeView {
    .container {
      width: 940px;
      padding: 0 15px;
    }
  }
}
@media screen and (max-width: 768px) {
  // 大分辨率手机或者平板垂直向上
  .homeView {
    .container {
      width: 750px;
      padding: 0 15px;
    }
  }
}
@media screen and (max-width: 640px) {
  // 手机
  .homeView {
    .container {
      width: 100%;
      padding: 0 15px;
      .logoBox {
        width: 300px;
      }
    }
  }
}
</style>
