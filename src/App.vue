<template>
  <!-- 全局响应遮罩 -->
  <a-spin tip="Loading..." size="large" :spinning="LOADING_STATE">
    <!-- 默认路由出口 -->
    <router-view />
  </a-spin>
  <a-back-top />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useLoadingStateStore } from "./store/loadingStateStore";
const { LOADING_STATE } = storeToRefs(useLoadingStateStore());
</script>

<style lang="scss"></style>
