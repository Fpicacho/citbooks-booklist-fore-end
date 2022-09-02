import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
createApp(App).use(router).use(pinia).use(Antd).mount("#app");
