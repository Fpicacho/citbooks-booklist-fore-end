<template>
  <!-- 主场页面 src\views\Home\HomeView.vue-->
  <div class="homeView">
    
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.homeView {
  background: #f6f6f6;
}

@media screen and (max-width: 1080px) {
  // 正常电脑分辨率
}
@media screen and (max-width: 1024px) {
  // 低分辨率屏幕或者平板横向
}
@media screen and (max-width: 768px) {
  // 大分辨率手机或者平板垂直向上
}
@media screen and (max-width: 640px) {
  // 手机
}
</style>
