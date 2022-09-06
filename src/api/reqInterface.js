import fetch from "./fetch";
export default {
  // 登录
  userLogin(params) {
    return fetch.get('/comments',params);
  },
};
