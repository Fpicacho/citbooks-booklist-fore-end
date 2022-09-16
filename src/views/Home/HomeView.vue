<template>
  <!-- 主场页面 src\views\Home\HomeView.vue-->
  <div class="homeView">
    <div class="container">
      <!-- logo -->
      <div class="logoBox">
        <img src="../../assets/img/logo.png" alt="" />
        <span>创新、诚信、服务、求实</span>
      </div>
      <!-- 搜索框 -->
      <div class="searchBox">
        <a-input-group compact id="SearchBoxForm">
          <a-select v-model:value="state.searchBoxData.type">
            <a-select-option value="keyword">关键字</a-select-option>
            <a-select-option value="isbn">ISBN</a-select-option>
            <a-select-option value="pubyear">出版年</a-select-option>
            <a-select-option value="pub">出版社</a-select-option>
            <a-select-option value="title">题名</a-select-option>
          </a-select>
          <a-input
            v-model:value="state.searchBoxData.value"
            placeholder="请输入检索内容"
            @keydown.enter="onSearch"
          />
          <a-button type="primary" @click="onSearch">搜索</a-button>
        </a-input-group>
        <span
          id="peCategorySearch"
          class="categorySearch"
          @click="visible = !visible"
          >点击按分类搜索 (共检索到
          <span style="color: #e94235">{{ state.pager.total }}</span>
          本书)</span
        >
        <span id="pcCategorySearch" class="categorySearch"
          >共检索到
          <span style="color: #e94235">{{ state.pager.total }}</span> 本书</span
        >
      </div>
      <main>
        <!-- pc端二级书容器 -->
        <div class="pcTreeBox">
          <a-image-preview-group>
            <a-carousel
              autoplay
              effect="fade"
              :autoplaySpeed="6000"
              :speed="1000"
            >
              <a-image
                v-for="(item, index) in state.bannerList"
                :key="index"
                :src="item"
                style="width: 23%"
              />
            </a-carousel>
          </a-image-preview-group>
          <a-affix>
            <div
              style="
                padding: 16px;
                box-shadow: 0px 1px 3px #ddd;
                background: #fff;
              "
            >
              <p>按分类搜索：</p>
              <a-tree
                v-if="state.treeData.length"
                :tree-data="state.treeData"
                :field-names="fieldNames"
                :block-node="true"
                @check="clickTreeNode"
                :checkable="true"
                :height="600"
              ></a-tree>
            </div>
          </a-affix>
        </div>
        <!-- 图书列表容器 -->
        <div class="bookList">
          <BookItem
            v-if="state.bookListData.length > 0"
            v-for="item in state.bookListData"
            :key="item.isbn"
            :data="item"
            @click.stop="openDetailsView(item.isbn)"
          >
            <div style="margin-top: 10px">
              <!-- 插槽行为 src\views\Home\HomeView.vue-->
              <a-button type="primary" @click.stop="SetBookListItem(item)"
                >加入书单</a-button
              >
            </div>
          </BookItem>
          <a-empty
            v-else
            description="找不到相关内容，换一种检索方式或者向我们提交建议。"
            style="padding: 25px"
          />
        </div>
      </main>
      <!-- 分页器 -->
      <a-pagination
        :total="state.pager.total"
        :current="state.pager.current"
        :page-size="state.pager.pageSize"
        show-less-items
        @change="clickPagination"
      />
      <!-- 分类抽屉 -->
      <a-drawer
        :width="310"
        title="分类搜索"
        placement="left"
        :visible="visible"
        @close="visible = !visible"
      >
        <!-- 二级树 -->
        <a-tree
          v-if="state.treeData.length"
          :tree-data="state.treeData"
          :field-names="fieldNames"
          :block-node="true"
          @check="clickTreeNode"
          :checkable="true"
        ></a-tree>
      </a-drawer>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import BookItem from "../../components/home/homeView/BookItem.vue";
import { message } from "ant-design-vue";

import utility from "../../utility/index";
import GlobalConfig from "../../config/index";
import reqInterface from "../../api/reqInterface";

import { useBookListStore } from "../../store/bookListStore";
import { useUserInfoStore } from "../../store/userInfoStore";
const { SetBookListItem } = useBookListStore();
const { USER_INFO } = useUserInfoStore();

let categoryList = "";
const fieldNames = {
  title: "name",
  key: "id",
};
const visible = ref(false);
const state = reactive({
  // 轮播数据
  bannerList: [],
  // 二级树数据
  treeData: [
    {
      name: "载入中...",
      id: "computer",
    },
  ],
  // 图书列表数据
  bookListData: [],
  // 分页器数据
  pager: {
    total: 0, // 数据总数
    current: 1, // 当前页数
    pageSize: 10, // 每页条数
  },
  // 搜索框数据
  searchBoxData: {
    type: "keyword",
    value: "",
  },
});

// 页面初始化
onMounted(() => {
  state.bannerList = USER_INFO.bannerList;
  categoryTreeNode({ bookShowId: USER_INFO.bookShowId });
  bookCategorySearch({
    bookShowId: USER_INFO.bookShowId,
    category: "",
    pages: state.pager.current,
    length: state.pager.pageSize,
  });
});

// 搜索逻辑
function onSearch() {
  if (state.searchBoxData.value === "") {
    message.error("输入内容为空，请检查！");
    return;
  }
  reqInterface
    .bookSearch({
      bookShowId: USER_INFO.bookShowId,
      pages: 1,
      length: state.pager.pageSize,
      type: state.searchBoxData.type,
      value: state.searchBoxData.value,
    })
    .then((res) => {
      state.pager.current = 1;
      state.pager.total = res.data.length;
      state.bookListData = [];
      try {
        res.data.paDatas.forEach((item) => {
          state.bookListData.push(bookItemPure(item));
        });
      } catch (error) {
        console.log("数据为空");
      }
    });
}

// 跳转详情逻辑
function openDetailsView(target) {
  utility.goTo("home-details", { isbn: target });
}

// 点击分页器逻辑
function clickPagination(index, page) {
  state.pager.current = index;
  state.pager.pageSize = page;
  bookCategorySearch({
    bookShowId: USER_INFO.bookShowId,
    category: categoryList,
    pages: state.pager.current,
    length: state.pager.pageSize,
  });
  document.scrollingElement.scrollTop = 0;
}

// 获取二级树数据
function categoryTreeNode(params) {
  reqInterface.categoryTreeNode(params).then((res) => {
    state.treeData = res.data.data;
  });
}

// 点击二级树节点逻辑
function clickTreeNode(node) {
  // const reg = /-/g;
  categoryList = node.join(";");
  state.pager.current = 1;
  bookCategorySearch({
    bookShowId: USER_INFO.bookShowId,
    category: categoryList,
    pages: 1,
    length: state.pager.pageSize,
  });
}

// 获取图书列表数据
function bookCategorySearch(params) {
  reqInterface.bookCategorySearch(params).then((res) => {
    state.pager.total = res.data.length;
    state.bookListData = [];
    res.data.paDatas.forEach((item) => {
      state.bookListData.push(bookItemPure(item));
    });
  });
}

// 图书列表数据纯净化
function bookItemPure(value) {
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
  };
}
</script>

<style lang="scss" scoped>
.homeView {
  background: #f6f6f6;
  min-height: 88vh;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 63%;
    margin: 0 auto;
    padding: 0 15px;
    .logoBox {
      display: flex;
      flex-direction: column;
      width: 400px;
      text-align: center;
      img {
        object-fit: contain;
        width: 100%;
      }
      span {
        color: #90a5a8;
        font-weight: 400;
        padding: 4px 0 15px 0;
        font-style: italic;
        margin-bottom: 50px;
      }
    }
    .searchBox {
      width: 100%;
      #SearchBoxForm {
        display: flex;
      }
      .categorySearch {
        display: inline-block;
        padding-top: 15px;
        border-bottom: 1px dashed;
        color: #777;
        font-size: 14px;
        cursor: pointer;
      }
    }
    #peCategorySearch {
      display: none;
    }
    main {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      .pcTreeBox {
        width: 23%;
        background: #f6f6f6;
        border-radius: 5px;
        .ant-carousel {
          margin-bottom: 25px;
        }
      }
      .bookList {
        width: 75%;
        height: 100%;
        border: 1px solid #aaa;
        background: #fff;
        .bookItem:nth-last-child(1) {
          border-bottom: none;
        }
      }
    }
    .ant-pagination {
      margin: 25px 0 50px;
    }
  }
}

@media screen and (max-width: 1080px) {
  // 正常电脑分辨率
}
@media screen and (max-width: 1024px) {
  // 低分辨率屏幕或者平板横向
  .homeView {
    .container {
      width: 90%;
      padding: 0 15px;
    }
  }
}
@media screen and (max-width: 768px) {
  // 大分辨率手机或者平板垂直向上
  .homeView {
    .container {
      width: 100%;
      padding: 0 15px;
      #pcCategorySearch {
        display: none;
      }
      #peCategorySearch {
        display: inline-block;
      }
      main {
        .pcTreeBox {
          display: none;
        }
        .bookList {
          width: 100%;
        }
      }
    }
  }
}
@media screen and (max-width: 640px) {
  // 手机
  .homeView {
    .container {
      width: 100%;
      padding: 0 15px;
      .logoBox {
        width: 300px;
        margin-top: 25px;
        span {
          margin-bottom: 25px;
        }
      }
    }
  }
}
</style>
