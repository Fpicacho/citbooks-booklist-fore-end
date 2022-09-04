import { defineStore } from "pinia";
// 全局加载状态容器
export const useLoadingStateStore = defineStore("loadingStateStore", {
  state: () => {
    return {
      LOADING_STATE: false,
    };
  },
  actions: {
    // 切换加载状态逻辑
    SetloadingState(state = false) {
      this.LOADING_STATE = state;
    },
  },
});
