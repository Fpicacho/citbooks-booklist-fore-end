<template>
  <!-- 详情页面 src\views\Home\DetailsView.vue-->
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
                  <div class="lable-title">{{ $t("details.Category") }}</div>
                  <div>{{ bookDetails.category }}</div>
                </div>
                <div class="label">
                  <div class="lable-title">{{ $t("details.Publisher") }}</div>
                  <div>{{ bookDetails.press }}</div>
                </div>
                <div class="label">
                  <div class="lable-title">{{ $t("details.Binding") }}</div>
                  <div>{{ bookDetails.binding }}</div>
                </div>
                <div class="label">
                  <div class="lable-title">{{ $t("details.Pages") }}</div>
                  <div>{{ bookDetails.pages }}</div>
                </div>
              </div>
              <div class="info-r-b-r">
                <div class="label">
                  <div class="lable-title">{{ $t("details.CLCNumber") }}</div>
                  <div>{{ bookDetails.clcNo }}</div>
                </div>
                <div class="label">
                  <div class="lable-title">{{ $t("details.ISBN") }}</div>
                  <div>{{ bookDetails.isbn }}</div>
                </div>
                <div class="label">
                  <div class="lable-title">
                    {{ $t("details.Availability") }}
                  </div>
                  <div>{{ bookDetails.supplyInfo }}</div>
                </div>
                <div class="label">
                  <div class="lable-title">{{ $t("details.Price") }}</div>
                  <div>{{ bookDetails.price }} {{ bookDetails.monetary }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 操作面板 -->
        <div class="ctrBox">
          <a-button type="primary" @click="addBookList">{{
            $t("details.add")
          }}</a-button>
        </div>
      </div>
      <a-tabs v-model:activeKey="activeKey" style="margin-top: 15px">
        <a-tab-pane key="1" :tab="$t('details.IntroductionInfo')">{{
          bookDetails.description ? bookDetails.description : "暂无 None"
        }}</a-tab-pane>
        <a-tab-pane key="2" :tab="$t('details.AwardInfo')">{{
          bookDetails.awardInfo ? bookDetails.awardInfo : "暂无 None"
        }}</a-tab-pane>
        <a-tab-pane key="3" :tab="$t('details.CollectionInfo')">{{
          bookDetails.eventInfo ? bookDetails.eventInfo : "暂无 None"
        }}</a-tab-pane>
      </a-tabs>
      <div style="height: 50px"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { storeToRefs } from "pinia";

import reqInterface from "../../api/reqInterface";
import utility from "../../utility/index";
import GlobalConfig from "../../config/index";

import { useBookListStore } from "../../store/bookListStore";
import { useUserInfoStore } from "../../store/userInfoStore";
import { useI18nStateStore } from "../../store/i18nStore";
const { SetBookListItem } = useBookListStore();
const { USER_INFO } = useUserInfoStore();
const { I18n_STATE } = storeToRefs(useI18nStateStore());
const I18nStateStore = useI18nStateStore();
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
const bookDetails = ref({});
const activeKey = ref("1");
// 监听语言切换更新导航
I18nStateStore.$subscribe((mutation, state) => {
  switch (state.I18n_STATE) {
    case "English":
      routes.value[0].breadcrumbName = "书展首页";
      routes.value[1].breadcrumbName = `图书详情：${bookDetails.value.title}`;
      break;
    case "简体中文":
      routes.value[0].breadcrumbName = "Home";
      routes.value[1].breadcrumbName = `Book details: ${bookDetails.value.title}`;
      break;
    default:
      break;
  }
});
// 监听页面渲染生命周期
onMounted(() => {
  bookInfoDetail();
  switch (I18n_STATE.value) {
    case "English":
      routes.value[0].breadcrumbName = "书展首页";
      routes.value[1].breadcrumbName = `图书详情：`;
      break;
    case "简体中文":
      routes.value[0].breadcrumbName = "Home";
      routes.value[1].breadcrumbName = `Book details:`;
      break;
    default:
      break;
  }
});

// 获取详情逻辑
function bookInfoDetail() {
  reqInterface
    .bookInfoDetail({
      bookShowId: USER_INFO.bookShowId,
      isbn: router.query.isbn,
    })
    .then((res) => {
      if (!res.data.data) {
        utility.goTo("404");
        return;
      }
      bookDetails.value = bookDetailsPure(res.data.data);
      routes.value[1].breadcrumbName += bookDetails.value.title;
    });
}

// 图书详情数据纯净化
function bookDetailsPure(value) {
  return {
    imgUrl: `${GlobalConfig.imgServeUrl}${value.isbn}.jpg`,
    title: `${value.chineseTitle} ${value.title}`,
    author: `${value.author}`,
    press: `${value.publisherName} ${value.publishYear}`,
    category: `${value.category1}-${value.category2}`,
    isbn: value.isbn,
    clcNo: value.clc,
    binding: value.binding,
    pages: value.pageSize,
    monetary: value.currency,
    price: value.price,
    supplyInfo: value.supplyInfo,
    description: value.description,
    awardInfo: value.awardInfo,
    eventInfo: value.eventInfo,
  };
}

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
            margin: 20px 0;
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
