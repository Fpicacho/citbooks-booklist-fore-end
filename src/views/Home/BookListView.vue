<template>
  <!-- 我的书单 src\views\Home\BookListView.vue-->
  <div class="bookListView">
    <div class="container">
      <!-- 提示信息 -->
      <a-alert
        :message="$t('PromptInfo.message')"
        type="warning"
        closable
        style="margin-bottom: 20px"
      />
      <!-- 面包导航 -->
      <a-breadcrumb :routes="routes" style="margin: 0; margin-bottom: 20px">
        <template #itemRender="{ route, params, routes, paths }">
          <span v-if="routes.indexOf(route) === routes.length - 1">{{
            route.breadcrumbName
          }}</span>
          <router-link v-else :to="{ name: route.name }">
            {{ route.breadcrumbName }}</router-link
          >
        </template>
      </a-breadcrumb>
      <!-- 图书列表 -->
      <div class="tableBox">
        <a-table
          :columns="columns"
          :dataSource="BOOK_LIST"
          :scroll="{ x: 1024 }"
          bordered
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'imgUrl'">
              <a-image
                :src="record.imgUrl"
                fallback="data:image/png;base64,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"
                :width="70"
              />
            </template>
            <!-- 操作面板#表单插槽 -->
            <template v-if="column.dataIndex === 'operate'">
              <a-button
                type="link"
                @click="utility.goTo('home-details', { isbn: record.isbn })"
                >{{ $t("bookList.Details") }}</a-button
              >
              <a-button
                type="link"
                @click="DeleteBookListItem(index, record)"
                danger
                >{{ $t("bookList.Delete") }}</a-button
              >
            </template>
          </template>
          <template #footer>
            <a-button type="primary" @click="utility.outputExcel(BOOK_LIST)">{{
              $t("bookList.Excel")
            }}</a-button>
            <a-button type="primary" @click="visible = !visible"
              >{{ $t("bookList.Upload") }} ({{ BOOK_LIST.length }})</a-button
            >
          </template>
        </a-table>
      </div>
      <!-- 提交书单抽屉 -->
      <a-drawer
        v-model:visible="visible"
        class="custom-class"
        :title="$t('bookList.Upload2')"
        placement="left"
        width="320"
      >
        <!-- 提交书单表单 -->
        <a-form
          :model="state.formState"
          name="basic"
          autocomplete="off"
          @finish="onFinish"
        >
          <a-form-item
            :label="$t('bookList.Name')"
            name="teachName"
            :rules="[{ required: true, message: $t('bookList.Name2') }]"
          >
            <a-input
              v-model:value="state.formState.teachName"
              :maxlength="10"
              :placeholder="$t('bookList.Name2')"
            />
          </a-form-item>
          <a-form-item
            :label="$t('bookList.Telephone')"
            name="telNum"
            :rules="[
              {
                required: true,
                message: $t('bookList.Telephone2'),
                trigger: 'blur',
              },
              {
                pattern:
                  /^1\d{10}$|^(0\d{2,3}-?|0\d2,3)?[1-9]\d{4,7}(-\d{1,8})?$/,
                message: $t('bookList.Telephone3'),
                trigger: 'blur',
              },
            ]"
          >
            <a-input
              v-model:value="state.formState.telNum"
              :maxlength="11"
              :placeholder="$t('bookList.Telephone4')"
            />
          </a-form-item>
          <a-form-item
            :label="$t('bookList.Mail')"
            name="email"
            :rules="[
              { required: true, message: $t('bookList.Mail2') },
              {
                pattern: /^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/,
                message: $t('bookList.Mail3'),
                trigger: 'blur',
              },
            ]"
          >
            <a-input
              v-model:value="state.formState.email"
              :maxlength="50"
              :placeholder="$t('bookList.Mail2')"
            />
          </a-form-item>
          <a-form-item
            :label="$t('bookList.Faculty')"
            name="depart"
            :rules="[{ required: true, message: $t('bookList.Faculty2') }]"
          >
            <a-input
              v-model:value="state.formState.depart"
              :maxlength="50"
              :placeholder="$t('bookList.Faculty2')"
            />
          </a-form-item>
          <a-form-item
            :label="$t('bookList.Type')"
            name="type"
            :rules="[{ required: true, message: $t('bookList.Type2') }]"
          >
            <a-select v-model:value="state.formState.type" :options="types" />
          </a-form-item>
          <a-form-item
            :label="$t('bookList.Student')"
            name="cardNum"
            :rules="[{ required: true, message: $t('bookList.Student2') }]"
          >
            <a-input
              v-model:value="state.formState.cardNum"
              :maxlength="50"
              :placeholder="$t('bookList.Student2')"
            />
          </a-form-item>
          <a-form-item
            :label="$t('bookList.Reason')"
            name="mark"
            :rules="[
              {
                required: true,
                message: $t('bookList.Reason2'),
              },
            ]"
          >
            <a-textarea
              v-model:value="state.formState.mark"
              :maxlength="300"
              show-count
              allow-clear
              :placeholder="$t('bookList.Reason2')"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :loading="LOADING_STATE"
              style="width: 100%"
              >{{ $t("bookList.Submit") }}</a-button
            >
          </a-form-item>
        </a-form>
      </a-drawer>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterLink } from "vue-router";
import utility from "../../utility/index";
import reqInterface from "../../api/reqInterface";
import { message } from "ant-design-vue";
import { storeToRefs } from "pinia";
import { useBookListStore } from "../../store/bookListStore";
import { useLoadingStateStore } from "../../store/loadingStateStore";
import { useUserInfoStore } from "../../store/userInfoStore";
import { useI18nStateStore } from "../../store/i18nStore";
import i18n from "@/i18n";
const { BOOK_LIST } = storeToRefs(useBookListStore());
const { DeleteBookListItem } = useBookListStore();
const { LOADING_STATE } = storeToRefs(useLoadingStateStore());
const { SetloadingState } = useLoadingStateStore();
const { USER_INFO } = useUserInfoStore();
const { I18n_STATE } = storeToRefs(useI18nStateStore());
const I18nStateStore = useI18nStateStore();
const { t } = i18n.global;

const routes = ref([
  {
    name: "home",
    breadcrumbName: "书展首页",
  },
  {
    name: "home-bookList",
    breadcrumbName: "我的书单",
  },
]);
const columns = ref([
  {
    title: "封面",
    dataIndex: "imgUrl",
    key: "imgUrl",
    fixed: true,
  },
  {
    title: "书名",
    dataIndex: "title",
    key: "title",
    fixed: true,
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "出版社",
    dataIndex: "press",
    key: "press",
  },
  {
    title: "类别",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "ISBN",
    dataIndex: "isbn",
    key: "isbn",
  },
  {
    title: "中图分类号",
    dataIndex: "clcNo",
    key: "clcNo",
  },
  {
    title: "装帧",
    dataIndex: "binding",
    key: "binding",
  },
  {
    title: "页数",
    dataIndex: "pages",
    key: "pages",
  },
  {
    title: "币制",
    dataIndex: "monetary",
    key: "monetary",
  },
  {
    title: "价格",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "供货状态",
    dataIndex: "supplyInfo",
    key: "supplyInfo",
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    fixed: "right",
  },
]);
// ！类型修改
const types = [
  { label: "教师", value: "教师" },
  { label: "学生", value: "学生" },
  { label: "管理", value: "管理" },
  { label: "研究", value: "研究" },
  { label: "其他", value: "其他" },
];
const state = reactive({
  formState: {
    teachName: "",
    telNum: "",
    email: "",
    depart: "",
    type: "",
    cardNum: "",
    mark: "",
  },
});
let visible = ref(false);
onMounted(() => {
  switch (I18n_STATE.value) {
    case "English":
      ch();
      break;
    case "简体中文":
      en();
      break;
    default:
      break;
  }
});
// 提交表单逻辑
function onFinish(values) {
  if (BOOK_LIST.value.length > 0) {
    SetloadingState(true);
    const isbns = new Set();
    BOOK_LIST.value.forEach((item) => {
      isbns.add(item.isbn);
    });
    values.userId = USER_INFO.id;
    values.isbns = Array.from(isbns).join(";");
    values.bookShowId = USER_INFO.bookShowId;
    reqInterface.submitSelectBooks(values).then((res) => {
      message.success(t("bookList.Submit2"));
      visible.value = false;
    });
  } else {
    message.error(t("bookList.Submit3"));
  }
}
// 监听语言切换更新导航
I18nStateStore.$subscribe((mutation, state) => {
  switch (state.I18n_STATE) {
    case "English":
      ch();
      break;
    case "简体中文":
      en();
      break;
    default:
      break;
  }
});
function ch() {
  routes.value[0].breadcrumbName = "书展首页";
  routes.value[1].breadcrumbName = "我的书单";
  columns.value[0].title = "封面";
  columns.value[1].title = "书名";
  columns.value[2].title = "作者";
  columns.value[3].title = "出版社";
  columns.value[4].title = "类别";
  columns.value[5].title = "ISBN";
  columns.value[6].title = "中图分类号";
  columns.value[7].title = "装帧";
  columns.value[8].title = "页数";
  columns.value[9].title = "币制";
  columns.value[10].title = "价格";
  columns.value[11].title = "供货状态";
  columns.value[12].title = "操作";
}
function en() {
  routes.value[0].breadcrumbName = "Home";
  routes.value[1].breadcrumbName = "My book list";
  columns.value[0].title = "Cover";
  columns.value[1].title = "BookTitle";
  columns.value[2].title = "Author";
  columns.value[3].title = "PublishingHouse";
  columns.value[4].title = "Category";
  columns.value[5].title = "ISBN";
  columns.value[6].title = "CLCnumber";
  columns.value[7].title = "Framing";
  columns.value[8].title = "Pages";
  columns.value[9].title = "Currency";
  columns.value[10].title = "Price";
  columns.value[11].title = "Availability";
  columns.value[12].title = "Operate";
}
</script>

<style lang="scss" scoped>
.bookListView {
  background: #f6f6f6;
  min-height: 88vh;
  .container {
    width: 90%;
    padding: 25px 0;
    margin: 0 auto;
  }
}
@media screen and (max-width: 1080px) {
  // 正常电脑分辨率
}
@media screen and (max-width: 1024px) {
  // 低分辨率屏幕或者平板横向
  .bookListView {
    .container {
      width: 90%;
      padding: 0 15px;
    }
  }
}
@media screen and (max-width: 768px) {
  // 大分辨率手机或者平板垂直向上
  .bookListView {
    .container {
      width: 100%;
      padding: 0 15px;
    }
  }
}
@media screen and (max-width: 640px) {
  // 手机
  .bookListView {
    .container {
      width: 100%;
      padding: 0 15px;
    }
  }
}
</style>
<style lang="scss">
.bookListView {
  .ant-table-footer {
    display: flex;
    justify-content: end;
    .ant-btn {
      margin-left: 10px;
    }
  }
}
@media screen and (max-width: 768px) {
  // 大分辨率手机或者平板垂直向上
  .bookListView {
    .ant-table-footer {
      display: flex;
      flex-direction: column;
      justify-content: end;
      .ant-btn {
        margin-left: 0;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
