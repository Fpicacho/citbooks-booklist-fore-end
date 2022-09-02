<template>
  <!-- 我的书单 src\views\Home\BookListView.vue-->
  <div class="bookListView">
    <div class="container">
      <!-- 提示信息 -->
      <a-alert
        message="尊敬的用户您好，在使用移动设备时建议将屏幕横置，以获得更好的阅览体验！"
        type="warning"
        closable
        style="margin-bottom: 20px"
      />
      <!-- 表单 -->
      <div class="tableBox">
        <a-table
          :columns="columns"
          :dataSource="BOOK_LIST"
          :scroll="{ x: 1024 }"
          bordered
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'imgUrl'">
              <a-image
                :src="record.imgUrl"
                fallback="data:image/png;base64,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"
                :width="70"
              />
            </template>
            <!-- 操作面板#表单插槽 -->
            <template v-if="column.dataIndex === 'operate'">
              <a-button
                type="link"
                @click="utility.goTo('home-details', { isbn: record.isbn })"
                >详情</a-button
              >
              <a-button
                type="link"
                @click="DeleteBookListItem(index, record)"
                danger
                >删除</a-button
              >
            </template>
          </template>
          <template #footer>
            <a-button type="primary" @click="outputExcel"
              >导出书单至本地（Excel表格）</a-button
            >
            <a-button type="primary">提交数据</a-button>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import utility from "../../utility/index";
import { message } from "ant-design-vue";
import * as XLSX from "xlsx";
import { storeToRefs } from "pinia";
import { useBookListStore } from "../../store/bookListStore";
const { BOOK_LIST } = storeToRefs(useBookListStore());
const { DeleteBookListItem } = useBookListStore();
const columns = [
  {
    title: "封面",
    dataIndex: "imgUrl",
    key: "imgUrl",
    fixed: true,
  },
  {
    title: "书名",
    dataIndex: "title",
    key: "title",
    fixed: true,
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "出版社",
    dataIndex: "press",
    key: "press",
  },
  {
    title: "类别",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "ISBN",
    dataIndex: "isbn",
    key: "isbn",
  },
  {
    title: "中图分类号",
    dataIndex: "clcNo",
    key: "clcNo",
  },
  {
    title: "装帧",
    dataIndex: "binding",
    key: "binding",
  },
  {
    title: "页数",
    dataIndex: "pages",
    key: "pages",
  },
  {
    title: "币制",
    dataIndex: "monetary",
    key: "monetary",
  },
  {
    title: "价格",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "供货状态",
    dataIndex: "supplyInfo",
    key: "supplyInfo",
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    fixed: "right",
  },
];

// 导出Excel逻辑
function outputExcel() {
  if (BOOK_LIST.value.length > 0) {
    const ExcelItem = [];
    BOOK_LIST.value.forEach((item) => {
      let { imgUrl, ...params } = item;
      ExcelItem.push(params);
    });
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(ExcelItem);
    XLSX.utils.book_append_sheet(workbook, worksheet, "图书采购清单");
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "书名",
          "作者",
          "出版社",
          "类别",
          "ISBN",
          "中图分类号",
          "装帧",
          "页数",
          "币制",
          "价格",
          "供货状态",
        ],
      ],
      { origin: "A1" }
    );
    worksheet["!cols"] = [
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 20 },
    ];
    XLSX.writeFile(workbook, "图书采购清单.xlsx");
    message.success("导出Excel表格完成！")
    return;
  }
  message.error("书单为空，无法导出Excel");
}
</script>

<style lang="scss" scoped>
.bookListView {
  background: #f6f6f6;
  min-height: 88vh;
  .container {
    width: 90%;
    padding: 25px 0;
    margin: 0 auto;
  }
}
@media screen and (max-width: 1080px) {
  // 正常电脑分辨率
}
@media screen and (max-width: 1024px) {
  // 低分辨率屏幕或者平板横向
  .bookListView {
    .container {
      width: 90%;
      padding: 0 15px;
    }
  }
}
@media screen and (max-width: 768px) {
  // 大分辨率手机或者平板垂直向上
  .bookListView {
    .container {
      width: 100%;
      padding: 0 15px;
    }
  }
}
@media screen and (max-width: 640px) {
  // 手机
  .bookListView {
    .container {
      width: 100%;
      padding: 0 15px;
    }
  }
}
</style>
<style lang="scss">
.bookListView {
  .ant-table-footer {
    display: flex;
    justify-content: end;
    .ant-btn {
      margin-left: 10px;
    }
  }
}
@media screen and (max-width: 768px) {
  // 大分辨率手机或者平板垂直向上
  .bookListView {
    .ant-table-footer {
      display: flex;
      flex-direction: column;
      justify-content: end;
      .ant-btn {
        margin-left: 0;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
