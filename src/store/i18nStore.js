import { defineStore } from "pinia";
import i18n from "@/i18n";
const { locale } = i18n.global;
// 全局加载状态容器
export const useI18nStateStore = defineStore("i18nStateStore", {
  state: () => {
    return {
      I18n_STATE: "English",
    };
  },
  actions: {
    SetBookShowName() {
      if (this.I18n_STATE === "English") {
        this.I18n_STATE = "简体中文";
        locale.value = "en";
      } else {
        this.I18n_STATE = "English";
        locale.value = "ch";
      }
    },
  },
});
