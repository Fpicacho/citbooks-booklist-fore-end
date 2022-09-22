import { defineStore } from "pinia";
// 全局加载状态容器
export const useUserInfoStore = defineStore("userInfoStore", {
  state: () => {
    return {
      USER_INFO: {
        bookShowName: "",
        bookShowId: "",
        id: "",
        bookCount: "",
        bannerList: [],
        superUser: 1,
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
    SetBookCount(value) {
      this.USER_INFO.bookCount = value;
    },
    SetBannerList(value) {
      const list = value.split(";");
      this.USER_INFO.bannerList = list;
    },
    SetSuperUser(value) {
      this.USER_INFO.superUser = value;
    },
  },

  persist: true,
});
