// 请求方法&请求拦截
import axios from "axios";
import qs from "qs";
import { useLoadingStateStore } from "../store/loadingStateStore";
const { SetloadingState } = useLoadingStateStore();
import { message } from 'ant-design-vue';

const fetch = axios.create({
  timeout: 10000,
});

// 添加请求拦截器
fetch.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    SetloadingState(true);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
fetch.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    SetloadingState(false);
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    if (error.message.includes("timeout")) {
      message.error('当前服务状态拥挤，或网络环境不佳，请稍后重试。');
      console.log("请求超时:", error);
    }
    SetloadingState(false);
    return Promise.reject(error);
  }
);

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
