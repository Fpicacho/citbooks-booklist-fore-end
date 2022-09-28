// 请求方法&请求拦截
import axios from "axios";
import qs from "qs";
import { useLoadingStateStore } from "../store/loadingStateStore";
const { SetloadingState } = useLoadingStateStore();
import { message } from "ant-design-vue";
import GlobalConfig from "../config/index";
import utility from "../utility/index";

let development = process.env.NODE_ENV == "development" ? true : false;
let reqLength = 0;
const fetch = axios.create({
  baseURL: development ? "" : GlobalConfig.serverUrl,
  timeout: GlobalConfig.reqTimeout,
});
fetch.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// 添加请求拦截器
fetch.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    requestHeapDetection(true); //t
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
fetch.interceptors.response.use(
  // 2xx 范围内的状态码都会触发该函数。
  function (response) {
    if (response.data.success === "1") {
      requestHeapDetection(false); //f
      return response;
    } else {
      switch (response.data.success) {
        case "0":
          // 通常错误
          message.error(response.data.msg);
          break;
        case "-1":
          // 权限错误
          message.error("权限不足，或书展已关闭，请重新登录！");
          localStorage.clear();
          utility.goTo("login");
          break;
      }
    }
    requestHeapDetection(false); //f
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    if (error.message.includes("timeout")) {
      message.error("当前服务状态拥挤，或网络环境不佳，请稍后重试。");
    } else {
      message.error(`${error.response.status}:${error.response.statusText}`);
    }
    requestHeapDetection(false); //f
    return Promise.reject(error);
  }
);

// 请求队列
function requestHeapDetection(state) {
  if (state) {
    reqLength = reqLength + 1;
    SetloadingState(true);
    return;
  } else {
    reqLength = reqLength - 1;
    SetloadingState(true);
  }
  if (reqLength === 0) {
    SetloadingState(false);
  }
}

export default {
  get(url, params = {}) {
    return fetch({
      method: "get",
      url,
      params,
    });
  },
  post(url, params = {}, header) {
    // post请求在某些情况下可能需要携带额外的header
    if (header) {
      return fetch({
        method: "post",
        url,
        data: qs.stringify(params),
        headers: header,
      });
    } else {
      return fetch({
        method: "post",
        url,
        data: qs.stringify(params),
      });
    }
  },
  put(url, params = {}) {
    return fetch({
      method: "put",
      url,
      data: qs.stringify(params),
    });
  },
  delete(url, params = {}) {
    return fetch({
      method: "delete",
      url,
      params,
    });
  },
};
