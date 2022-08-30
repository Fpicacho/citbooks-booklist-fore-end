<template>
  <!-- 404页面 src\views\404.vue-->
  <div id="404">
    <a-result status="404" title="404" sub-title="生活总归带点荒谬，你说是吧。">
    <template #extra>
      <a-button type="primary">返回首页</a-button>
    </template>
  </a-result>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
