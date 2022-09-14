import { defineStore } from "pinia";
// 全局加载状态容器
export const useUserInfoStore = defineStore("userInfoStore", {
  state: () => {
    return {
      USER_INFO: {
        bookShowName: "",
        bookShowId: "",
        id: "",
      },
    };
  },
  actions: {
    SetBookShowName(value) {
      this.USER_INFO.bookShowName = value;
    },
    SetBookShowId(value) {
      this.USER_INFO.bookShowId = value;
    },
    SetId(value) {
      this.USER_INFO.id = value;
    },
  },

  persist: true,
});
