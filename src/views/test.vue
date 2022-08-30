<template>
  <!-- 登录页面 src\views\Login\LoginView.vue -->
  <div id="LoginView">
    <a-tree
      :tree-data="state.treeData"
      :block-node="true"
      @select="clickTreeNode"
      :height="300"
    />
    <a-pagination
      :total="state.totalData"
      :page-size="state.pageSize"
      show-less-items
      @change="clickPagination"
    />
    <button @click="state.totalData = 800">测试条数数据相应</button>
    <div class="tableBox">
      <a-table
      :columns="state.tableData.columns"
      :dataSource="state.tableData.data"
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'imgUrl'">
          <img
            :src="record.imgUrl"
            alt="书皮封面获取失败"
            style="max-width: 100px"
          />
        </template>
        <template v-if="column.dataIndex === 'operate'">
          <a-button type="primary" style="margin: 5px">详情</a-button>
          <a-button type="primary" danger style="margin: 5px" @click="clickDel(record.isbn)">删除</a-button>
        </template>
      </template>
    </a-table>
    </div>

    <button @click="exportExcel">导出表格</button>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import * as XLSX from "xlsx";
const state = reactive({
  // 条数数据 & 选书表单数据
  totalData: 200,
  pageSize: 10,
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
  // 列表数据
  tableData: {
    columns: [
      {
        title: "封面",
        dataIndex: "imgUrl",
        width: 100,
      },
      {
        title: "书名",
        dataIndex: "title",
        width: 400,
      },
      {
        title: "作者",
        dataIndex: "author",
      },
      {
        title: "出版社",
        dataIndex: "press",
      },
      {
        title: "ISBN",
        dataIndex: "isbn",
      },
      {
        title: "中图分类号",
        dataIndex: "clcNo",
      },
      {
        title: "装帧",
        dataIndex: "binding",
      },
      {
        title: "页数",
        dataIndex: "pages",
      },
      {
        title: "币制",
        dataIndex: "monetary",
      },
      {
        title: "价格",
        dataIndex: "price",
      },
      {
        title: "操作",
        dataIndex: "operate",
      },
    ],
    data: [
      {
        imgUrl:
          "https://th.bing.com/th/id/OIP.Lcl1VNhLUc9uljUtX9yPLwHaK0?w=128&h=186&c=7&r=0&o=5&pid=1.7",
        title: "JavaScript高级程序设计（第4版）",
        author: "Matt Frisbie",
        press: "人民邮电出版社",
        isbn: "1119366445",
        clcNo: "A10",
        binding: "XX装帧",
        pages: 931,
        monetary: "人民币",
        price: 80,
      },
      {
        imgUrl:
          "https://th.bing.com/th/id/OIP.Lcl1VNhLUc9uljUtX9yPLwHaK0?w=128&h=186&c=7&r=0&o=5&pid=1.7",
        title: "-学习JavaScript数据结构与算法第三版",
        author: "[巴西]格罗纳（LoianeGroner）",
        press: "人民邮电出版社",
        isbn: "7115510172",
        clcNo: "A12",
        binding: "aa装帧",
        pages: 314,
        monetary: "人民币",
        price: 55,
      },
      {
        imgUrl:
          "https://th.bing.com/th/id/OIP.Lcl1VNhLUc9uljUtX9yPLwHaK0?w=128&h=186&c=7&r=0&o=5&pid=1.7",
        title: "鸿蒙应用开发实战",
        author: "张荣超",
        press: "人民邮电出版社",
        isbn: "7115552878",
        clcNo: "B20",
        binding: "拉拉装帧",
        pages: 999,
        monetary: "美元",
        price: 100,
      },
    ],
  },
});

function clickPagination(index, page) {
  state.pageSize = page;
  console.log(index, page);
}

// 点击树节点事件
function clickTreeNode(node) {
  const reg = /-/g;
  if (reg.test(node[0])) {
    console.log(node[0]);
  }
}

// 点击删除事件
function clickDel(i){
  state.tableData.data = state.tableData.data.filter((obj)=>{
    return i !== obj.isbn
  })
}

function exportExcel() {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(state.tableData.data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "图书采购清单");
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      [
        "封面",
        "书名",
        "作者",
        "出版社",
        "ISBN",
        "中图分类号",
        "装帧",
        "页数",
        "币制",
        "价格",
      ],
    ],
    { origin: "A1" }
  );
  worksheet["!cols"] = [
    { wch: -10 },
    { wch: 40 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 10 },
  ];

  XLSX.writeFile(workbook, "图书采购清单.xlsx");
}


</script>

<style lang="scss" scoped>
  .tableBox{
    min-width: 1000px;
  }
</style>
