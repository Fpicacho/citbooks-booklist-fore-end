<template>
  <!-- 全局响应遮罩 -->
  <a-spin tip="Loading..." size="large" :spinning="false">
    <!-- 默认路由出口 -->
    <router-view />
  </a-spin>
  <a-back-top />
</template>

<style lang="scss"></style>
