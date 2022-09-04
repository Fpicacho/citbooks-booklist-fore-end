<template>
  <!-- 详情页面 src\views\Home\Details.vue-->
  <div id="Details">
    <!-- 面包导航 -->
    <a-breadcrumb :routes="routes" style="margin: 20px 0">
      <template #itemRender="{ route, params, routes, paths }">
        <span v-if="routes.indexOf(route) === routes.length - 1">{{
          route.breadcrumbName
        }}</span>
        <router-link v-else :to="{ name: route.name }">
          {{ route.breadcrumbName }}</router-link
        >
      </template>
    </a-breadcrumb>
    <p>{{ $route.query.isbn }}</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
const router = useRoute();
const routes = [
  {
    name: "home",
    breadcrumbName: "书展首页",
  },
  {
    name: "home-details",
    breadcrumbName: "图书详情",
  },
];
onMounted(() => {
  console.log(router.query.isbn);
});
</script>

<style lang="scss" scoped></style>
