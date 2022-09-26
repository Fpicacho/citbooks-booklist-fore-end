import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "ch", // 默认语言
  legacy: false, // 使用CompotitionAPI
  messages: {
    globalInjection: true,
    ch: require("./ch.js"),
    en: require("./en.js"),
  },
});
export default i18n;

// import { useI18n } from "vue-i18n";
// const { t } = useI18n();

// import i18n from "@/i18n";
// const { t } = i18n.global;
