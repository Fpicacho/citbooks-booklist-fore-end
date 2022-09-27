<template>
  <!-- 404页面 src\views\404.vue-->
  <div id="404">
    <a-result status="404" title="404" :sub-title="$t('404.title')">
    <template #extra>
      <a-button type="primary" @click="utility.goTo('home')">{{$t('404.BackToHome')}}</a-button>
    </template>
  </a-result>
  </div>
</template>

<script setup>
import utility from '../utility/index';
</script>

<style lang="scss" scoped></style>
