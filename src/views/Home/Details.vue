<template>
  <!-- 详情页面 src\views\Home\Details.vue-->
  <div class="details">
    <div class="container">
      <!-- 面包导航 -->
      <a-breadcrumb :routes="routes" style="margin-bottom: 20px">
        <template #itemRender="{ route, params, routes, paths }">
          <span v-if="routes.indexOf(route) === routes.length - 1">{{
            route.breadcrumbName
          }}</span>
          <router-link v-else :to="{ name: route.name }">
            {{ route.breadcrumbName }}</router-link
          >
        </template>
      </a-breadcrumb>
      <!-- 图书详情信息 -->
      <div class="bookDetails">
        <!-- 信息面板 -->
        <div class="info">
          <div class="info-l">
            <a-image :width="200" :src="bookDetails.imgUrl" />
          </div>
          <div class="info-r">
            <div class="info-r-t">
              <h1 class="title">{{ bookDetails.title }}</h1>
              <p
                style="
                  text-decoration: underline;
                  font-style: italic;
                  color: #49afd0;
                "
              >
                {{ bookDetails.author }}
              </p>
              <div style="margin-bottom: 14px">
                <a-rate :value="5" />
                <span style="margin-left: 15px">5/5</span>
              </div>
            </div>
            <div class="info-r-b">
              <div class="info-r-b-l">
                <div class="label">
                  <div class="lable-title">种类：</div>
                  <div>{{ bookDetails.category }}</div>
                </div>
                <div class="label">
                  <div class="lable-title">出版社：</div>
                  <div>{{ bookDetails.category }}</div>
                </div>
                <div class="label">
                  <div class="lable-title">装帧：</div>
                  <div>{{ bookDetails.binding }}</div>
                </div>
                <div class="label">
                  <div class="lable-title">页数：</div>
                  <div>{{ bookDetails.pages }}</div>
                </div>
              </div>
              <div class="info-r-b-r">
                <div class="label">
                  <div class="lable-title">中图分类号：</div>
                  <div>{{ bookDetails.clcNo }}</div>
                </div>
                <div class="label">
                  <div class="lable-title">ISBN：</div>
                  <div>{{ bookDetails.isbn }}</div>
                </div>
                <div class="label">
                  <div class="lable-title">供货状态：</div>
                  <div>{{ bookDetails.supplyInfo }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 操作面板 -->
        <div class="ctrBox">
          <a-button type="primary" @click="addBookList"
            >加入我的书单 +</a-button
          >
        </div>
      </div>
      <!-- 获奖信息面板 -->
      <div class="xInfo">
        <div class="title">获奖信息</div>
        <div class="info">
          {{ bookDetails.briefInfo }}
        </div>
      </div>
      <!-- 图书简介面板 -->
      <div class="xInfo">
        <div class="title">图书简介</div>
        <div class="info">
          {{ bookDetails.bookbInfo }}
        </div>
      </div>
      <!-- 垫片 用于撑篙底部 -->
      <div style="height: 50px"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { useBookListStore } from "../../store/bookListStore";
const { SetBookListItem } = useBookListStore();
const router = useRoute();
const routes = ref([
  {
    name: "home",
    breadcrumbName: "书展首页",
  },
  {
    name: "home-details",
    breadcrumbName: `图书详情：`,
  },
]);
const bookDetails = ref({
  imgUrl:
    "https://covers.zlibcdn2.com/covers299/books/7f/06/13/7f061349f720330e27c93802e42ed4fb.jpg",
  title: "日本动漫绘画中的线条设计",
  author: "上村雅春",
  press: "电子工业出版社",
  category: "计算机-编程",
  isbn: "7121310074",
  clcNo: "Z12",
  binding: "锁线胶订",
  pages: 200,
  monetary: "日元",
  price: 5000,
  supplyInfo: "现货，三个月内到货",
  bookbInfo: "图书简介",
  briefInfo: "获奖情况",
});

// 监听页面渲染生命周期
onMounted(() => {
  routes.value[1].breadcrumbName += bookDetails.value.title;
  console.log(router.query.isbn);
});

// 添加书单逻辑
function addBookList() {
  const { bookbInfo, briefInfo, ...ltem } = bookDetails.value;
  SetBookListItem(ltem);
}
</script>

<style lang="scss" scoped>
.details {
  background: #f6f6f6;
  min-height: 88vh;
  .container {
    width: 1000px;
    margin: 0 auto;
    .bookDetails {
      .info {
        display: flex;
        .info-l,
        .info-r {
          padding: 0 15px;
        }
        .info-r {
          min-width: 720px;
          .info-r-b {
            display: flex;
            .info-r-b-l,
            .info-r-b-r {
              width: 250px;
              .label {
                display: flex;
                margin: 5px 0;
                .lable-title {
                  color: #888;
                }
              }
            }
          }
        }
      }
      .ctrBox {
        padding: 0 15px;
        margin-top: 20px;
      }
    }
    .xInfo {
      margin-top: 15px;
      padding: 15px 15px 5px;
      .title {
        font-size: 21px;
        color: #49afd0;
        border-bottom: 2px solid #49afd0;
      }
      .info {
        width: 100%;
        background: #fff;
        padding: 15px;
        margin-top: 20px;
        border-radius: 2px;
        box-shadow: 0px 1px 3px #ddd;
      }
    }
  }
}
@media screen and (max-width: 1080px) {
  // 正常电脑分辨率
}
@media screen and (max-width: 1024px) {
  // 低分辨率屏幕或者平板横向
  .details {
    .container {
      width: 90%;
      padding: 0 15px;
      .bookDetails {
        .info {
          .info-r {
            min-width: 50%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  // 大分辨率手机或者平板垂直向上
  .details {
    .container {
      width: 100%;
      padding: 0 15px;
      .bookDetails {
        .info {
          flex-direction: column;
          .info-l {
            text-align: center;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 640px) {
  // 手机
  .details {
    .container {
      width: 100%;
      padding: 0 15px;
      .bookDetails {
        .info {
          .info-r-b {
            flex-direction: column;
          }
        }
        .ctrBox {
          .ant-btn {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
