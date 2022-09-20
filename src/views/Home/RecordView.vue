<template>
  <!-- 选书记录 src\views\Home\RecordView.vue-->
  <div class="recordView">
    <div class="container">
      <!-- 面包导航 -->
      <a-breadcrumb :routes="routes" style="margin: 0; margin-bottom: 20px">
        <template #itemRender="{ route, params, routes, paths }">
          <span v-if="routes.indexOf(route) === routes.length - 1">{{
            route.breadcrumbName
          }}</span>
          <router-link v-else :to="{ name: route.name }">
            {{ route.breadcrumbName }}</router-link
          >
        </template>
      </a-breadcrumb>
      <!-- 记录表格 -->
      <div class="tableBox">
        <a-table
          :columns="columns"
          :dataSource="store.tableData"
          :scroll="{ x: 1500 }"
          bordered
        >
          <template #bodyCell="{ column, record, index }">
            <!-- 操作面板#表单插槽 -->
            <template v-if="column.dataIndex === 'operate'">
              <a-button type="link" @click="jumpDetails(record.id)"
                >详情</a-button
              >
              <a-button
                type="link"
                @click="DeleteBookListItem(index, record)"
                danger
                >导出</a-button
              >
            </template>
          </template>
          <template #title>
            结果数：<span>8</span>&nbsp;&nbsp;&nbsp;&nbsp;选书总数量：<span
              >63</span
            >
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import utility from "../../utility/index";
const routes = [
  {
    name: "home",
    breadcrumbName: "书展首页",
  },
  {
    name: "home-record",
    breadcrumbName: "选书记录",
  },
];
const columns = [
  {
    title: "数量",
    dataIndex: "length",
    key: "length",
    width: 75
  },
  {
    title: "姓名",
    dataIndex: "title",
    key: "title",
    width: 90
  },
  {
    title: "部门",
    dataIndex: "bookShowName",
    key: "bookShowName",
    width: 150
  },
  {
    title: "电话",
    dataIndex: "telNum",
    key: "telNum",
    width: 120
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    width: 100
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    width: 100
  },
  {
    title: "上传时间",
    dataIndex: "upTime",
    key: "upTime",
    width: 180
  },
  {
    title: "推荐理由",
    dataIndex: "mark",
    key: "mark",
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    fixed: "right",
    width: 100
  },
];
const store = reactive({
  tableData: [
    {
      id: 1,
      length: 10,
      title: "揣方超",
      bookShowName: "哈尔滨佛学院",
      telNum: "18888888888",
      email: "fpicacho@gmail.com",
      type: "带专",
      upTime: "2022-09-21 09:36:15",
      mark: "没有",
    },
  ],
});
function jumpDetails(id) {
  console.log(id);
}
</script>

<style lang="scss" scoped>
.recordView {
  background: #f6f6f6;
  min-height: 88vh;
  .container {
    width: 63%;
    padding: 25px 0;
    margin: 0 auto;
  }
}
@media screen and (max-width: 1080px) {
  // 正常电脑分辨率
}
@media screen and (max-width: 1024px) {
  // 低分辨率屏幕或者平板横向
  .recordView {
    .container {
      width: 90%;
      padding: 0 15px;
    }
  }
}
@media screen and (max-width: 768px) {
  // 大分辨率手机或者平板垂直向上
  .recordView {
    .container {
      width: 100%;
      padding: 0 15px;
    }
  }
}
@media screen and (max-width: 640px) {
  // 手机
  .recordView {
    .container {
      width: 100%;
      padding: 0 15px;
    }
  }
}
</style>
