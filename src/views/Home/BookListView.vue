<template>
  <!-- 购物车 src\views\Home\BookListView.vue-->
  <div id="BookListView">
    <p>购物车</p>
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

<style lang="scss" scoped></style>
