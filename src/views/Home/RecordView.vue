<template>
  <!-- 选书记录 src\views\Home\RecordView.vue-->
  <div class="recordView">
    <div class="container">
      <a-alert
        message="尊敬的用户您好，在使用移动设备时建议将屏幕横置，以获得更好的阅览体验！"
        type="warning"
        closable
        style="margin-bottom: 20px"
      />
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
              <a-button type="link" @click="exportExcel(record.id)" danger
                >导出</a-button
              >
            </template>
          </template>
          <!-- 操作面板#表头插槽 -->
          <template #title>
            结果数：<span style="color: #ff4d4f">{{
              store.totalRecordCount
            }}</span
            >&nbsp;&nbsp;&nbsp;&nbsp;选书总数量：<span style="color: #ff4d4f">{{
              store.totalSelectBookCount
            }}</span>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import reqInterface from "../../api/reqInterface";
import utility from "../../utility/index";

import { useUserInfoStore } from "../../store/userInfoStore";
const { USER_INFO } = useUserInfoStore();
const $router = useRouter();
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
    dataIndex: "bookCount",
    key: "bookCount",
    width: 75,
  },
  {
    title: "姓名",
    dataIndex: "teachName",
    key: "teachName",
    width: 90,
  },
  {
    title: "部门",
    dataIndex: "depart",
    key: "depart",
    width: 100,
  },
  {
    title: "电话",
    dataIndex: "telNum",
    key: "telNum",
    width: 120,
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    width: 200,
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    width: 100,
  },
  {
    title: "上传时间",
    dataIndex: "createDate",
    key: "createDate",
    width: 180,
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
    width: 100,
  },
];
const store = reactive({
  totalRecordCount: 0,
  totalSelectBookCount: 0,
  tableData: [],
});

// 页面渲染完成时
onMounted(() => {
  selectBookRecord();
});

// 跳转详情
function jumpDetails(id) {
  $router.push(`/home/record/${id}`);
}
// 获取当前书展老师选书记录
function selectBookRecord() {
  reqInterface
    .selectBookRecord({
      userId: USER_INFO.id,
      bookShowId: USER_INFO.bookShowId,
    })
    .then((res) => {
      store.totalRecordCount = res.data.totalRecordCount;
      store.totalSelectBookCount = res.data.totalSelectBookCount;
      store.tableData = res.data.datas;
    });
}
// 导出表格
function exportExcel(id) {
  const bookListData = [];
  reqInterface
    .selectBookRecordItem({
      recordId: id,
    })
    .then((res) => {
      res.data.datas.forEach((item) => {
        bookListData.push(utility.bookItemPure(item));
      });
      utility.outputExcel(bookListData);
    });
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
