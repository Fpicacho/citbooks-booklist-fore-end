<template>
  <!-- Home系下路由出口 src\views\Home\IndexView.vue-->
  <div class="indexView">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Header from "../../components/home/Header.vue";
import Footer from "../../components/home/Footer.vue";

onMounted(() => {
  console.log("home");
});
</script>

<style lang="scss" scoped></style>
