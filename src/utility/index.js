import router from "../router/index";
import GlobalConfig from "../config/index";
import { message } from "ant-design-vue";
import * as XLSX from "xlsx";

// 跳转函数 可用于跳转内部路由或外部链接
function goTo(name, query = {}) {
  const regStr = /\//g;
  if (regStr.test(name)) {
    window.open(name, "_barck");
  } else {
    router.push({ name, query });
  }
}
// 图书列表数据纯净化
function bookItemPure(value) {
  return {
    imgUrl: `${GlobalConfig.imgServeUrl}${value.isbn}.jpg`,
    title: `${value.chineseTitle} ${value.title}`,
    author: `${value.author}`,
    press: `${value.publisherName} ${value.publishYear}`,
    category: `${value.category1}-${value.category2}`,
    isbn: value.isbn,
    clcNo: value.clc,
    binding: value.binding,
    pages: value.pageSize,
    monetary: value.currency,
    price: value.price,
    supplyInfo: value.supplyInfo,
  };
}
// 导出表格
function outputExcel(value) {
  if (value.length > 0) {
    const ExcelItem = [];
    value.forEach((item) => {
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
    message.success("导出Excel表格完成！");
    return;
  }
  message.error("书单为空，无法导出Excel");
}
export default {
  goTo,
  bookItemPure,
  outputExcel
};
