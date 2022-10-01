import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Antd from "ant-design-vue";
import { message } from "ant-design-vue";
import VueI18n from "./i18n";
import "ant-design-vue/dist/antd.css";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

router.beforeEach(async (to, from, next) => {
  const bookShowId = localStorage.userInfoStore;
  if (bookShowId) {
    // 本地存在bookShowId 放行并且执行验证bookShowId逻辑
    next();
  } else {
    // 用户未登录
    if (to.meta.noAuth) {
      // 验证路由是否需要权限
      next();
    } else {
      message.error("Error：未经授权！请登录。");
      next("/login");
    }
  }
});
createApp(App).use(router).use(VueI18n).use(pinia).use(Antd).mount("#app");