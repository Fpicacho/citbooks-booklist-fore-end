import fetch from "./fetch";
export default {
  // 登录
  userLogin(params) {
    return fetch.post("/ctiweb/onlinebookshow/userLogin.action", params);
  },
  // 获取分类信息
  categoryTreeNode(params) {
    return fetch.get("/ctiweb/onlinebookshow/categoryTreeNode.action", params);
  },
  // 提交客户选书结果
  submitSelectBooks(params) {
    return fetch.post(
      "/ctiweb/onlinebookshow/submitSelectBooks.action",
      params
    );
  },
  // 根据类别 书展id获取书目列表数据
  bookCategorySearch(params) {
    return fetch.post(
      "/ctiweb/onlinebookshow/bookCategorySearch.action",
      params
    );
  },
  // 根据ISBN 书展ID获取图书详细信息
  bookInfoDetail(params) {
    return fetch.get("/ctiweb/onlinebookshow/bookInfoDetail.action", params);
  },
  // 检索
  bookSearch(params) {
    return fetch.get("/ctiweb/onlinebookshow/bookSearch.action", params);
  },
  // 获取当前书展老师选书记录
  selectBookRecord(params) {
    return fetch.get("/ctiweb/onlinebookshow/selectBookRecord.action", params);
  },
  // 描述根据选书记录id获取选书明细
  selectBookRecordItem(params) {
    return fetch.get("/ctiweb/onlinebookshow/selectBookRecordItem.action", params);
  },
};
