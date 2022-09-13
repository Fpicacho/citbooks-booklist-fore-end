import fetch from "./fetch";
export default {
  // 登录
  userLogin(params) {
    return fetch.get("/ctiweb/onlinebookshow/userLogin.action", params);
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
};