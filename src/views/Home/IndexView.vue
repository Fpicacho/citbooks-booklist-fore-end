<template>
  <!-- Home系下路由出口 src\views\Home\IndexView.vue-->
  <div class="indexView">
    <Header></Header>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name"/>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name"/>
    </router-view>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "../../components/home/Header.vue";
import Footer from "../../components/home/Footer.vue";
</script>

<style lang="scss" scoped></style>
