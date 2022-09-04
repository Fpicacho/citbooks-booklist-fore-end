<template>
  <!-- 404页面 src\views\404.vue-->
  <div id="404">
    <a-result status="404" title="404" sub-title="生活总归带点荒谬，你说是吧。">
    <template #extra>
      <a-button type="primary" @click="utility.goTo('home')">返回首页</a-button>
    </template>
  </a-result>
  </div>
</template>

<script setup>
import utility from '../utility/index';
</script>

<style lang="scss" scoped></style>
