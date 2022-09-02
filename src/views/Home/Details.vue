<template>
  <!-- 详情页面 src\views\Home\Details.vue-->
  <div id="Details">
    <p>{{ $route.query.isbn }}</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
const router = useRoute();
onMounted(() => {
  console.log(router.query.isbn);
});
</script>

<style lang="scss" scoped></style>
