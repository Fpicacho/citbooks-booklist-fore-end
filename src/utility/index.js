import router from "../router/index";

// 跳转函数
function goTo(name, query = {}) {
  const regStr = /\//g;
  if (regStr.test(name)) {
    window.open(name, "_barck");
  } else {
    router.push({ name, query });
  }
}
export default {
  goTo,
};
