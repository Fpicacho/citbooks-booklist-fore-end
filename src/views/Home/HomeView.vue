<template>
  <!-- 主场页面 src\views\Home\HomeView.vue-->
  <div class="homeView">
    <div class="container">
      <!-- logo -->
      <div class="logoBox">
        <img src="../../assets/img/logo.png" alt="" />
        <span>CtiBooks项目中的一部分,线上书展服务。</span>
      </div>
      <!-- 搜索框 -->
      <div class="searchBox">
        <a-input-group compact id="SearchBoxForm">
          <a-select v-model:value="state.searchBoxData.type">
            <a-select-option value="title">书名</a-select-option>
            <a-select-option value="author">作者名</a-select-option>
            <a-select-option value="press">出版社</a-select-option>
            <a-select-option value="isbn">ISBN</a-select-option>
          </a-select>
          <a-input v-model:value="state.searchBoxData.value" placeholder="请输入检索内容"/>
          <a-button type="primary" @click=onSearch>搜索</a-button>
        </a-input-group>
        <span
          id="peCategorySearch"
          class="categorySearch"
          @click="visible = !visible"
          >按分类搜索</span
        >
        <span id="pcCategorySearch" class="categorySearch">共计15272本书</span>
      </div>
      <main>
        <!-- pc端二级书容器 -->
        <div class="pcTreeBox">
          <a-image-preview-group>
            <a-carousel autoplay>
              <a-image
                v-for="(item, index) in state.bannerList"
                :key="index"
                :src="item"
                style="width: 23%"
              />
            </a-carousel>
          </a-image-preview-group>
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
              :block-node="true"
              @check="clickTreeNode"
              :checkable="true"
            />
          </div>
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
          :block-node="true"
          @check="clickTreeNode"
          :checkable="true"
        />
      </a-drawer>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import BookItem from "../../components/home/homeView/BookItem.vue";
import { message } from "ant-design-vue";

import utility from "../../utility/index";
import reqInterface from "../../api/reqInterface";

import { useBookListStore } from "../../store/bookListStore";
const { SetBookListItem } = useBookListStore();

const visible = ref(false);
const state = reactive({
  // 轮播数据
  bannerList: [
    "https://tx-free-imgs2.acfun.cn/kimg/bs2/zt-image-host/ChgwOGNjZjlmNGU2MDIxMGMwYzBhM2NkMDMQmMzXLw.png?x-oss-process=image/resize,m_fill,w_964,h_494",
    "https://tx-free-imgs2.acfun.cn/kimg/bs2/zt-image-host/ChgwOGQ2ZWZlOGU1MDIxMGY0OTNkNWIxMDYQmMzXLw.png?x-oss-process=image/resize,m_fill,w_964,h_494",
    "https://tx-free-imgs2.acfun.cn/kimg/bs2/zt-image-host/ChgwOGMzYTI5MWU2MDIxMGViYTY5YWYyMDEQmMzXLw.png?x-oss-process=image/resize,m_fill,w_964,h_494",
  ],
  // 二级树数据
  treeData: [
    {
      title: "文化、科学、教育、体育",
      key: "computer",
      children: [
        {
          title: "编程语言",
          key: "computer-programming",
        },
        {
          title: "系统开发",
          key: "computer-systemDeveLopment",
        },
        {
          title: "编程算法",
          key: "computer-algorithm",
        },
      ],
    },
    {
      title: "小说",
      key: "Anovel",
      children: [
        {
          title: "武打",
          key: "Anovel-wuda",
        },
        {
          title: "武侠",
          key: "Anovel-wuxia",
        },
        {
          title: "科幻",
          key: "Anovel-kehuan",
        },
      ],
    },
  ],
  // 图书列表数据
  bookListData: [
    {
      imgUrl:
        "https://th.bing.com/th/id/OIP.JVLKy4czE7GaNNunNMofXAHaIp?w=176&h=206&c=7&r=0&o=5&pid=1.7",
      title: "斗罗大陆",
      author: "唐家三少",
      press: "湖南少年儿童出版社",
      category: "计算机-编程",
      isbn: "7556242331",
      clcNo: "A10",
      binding: "锁线胶订",
      pages: 931,
      monetary: "人民币",
      price: 80,
      supplyInfo: "库存现货，数量1",
    },
    {
      imgUrl:
        "https://th.bing.com/th/id/OIP.udJmEu3EFv13pStbKkkD0gAAAA?w=204&h=290&c=7&r=0&o=5&pid=1.7",
      title: "科学的超电磁炮 SS 1",
      author: "镰池和馬",
      press: "epub掌上書苑",
      category: "计算机-编程",
      isbn: "1174981576",
      clcNo: "B122",
      binding: "锁线胶订",
      pages: 150,
      monetary: "人民币",
      price: 30,
      supplyInfo: "现货，三个月内到货",
    },
    {
      imgUrl:
        "https://th.bing.com/th/id/OIP.TFrre62yShBQLBZTXkI4OgAAAA?w=126&h=182&c=7&r=0&o=5&pid=1.7",
      title: "青春猪头少年不会梦到兔女郎学姐",
      author: "鸭志田一",
      press: "中信出版社",
      category: "计算机-编程",
      isbn: "B072C29BL1",
      clcNo: "B22",
      binding: "方背平脊精装",
      pages: 999,
      monetary: "美元",
      price: 100,
      supplyInfo: "现货，三个月内到货",
    },
    {
      imgUrl:
        "https://th.bing.com/th/id/OIP.dkqqpqYc8kZZZqHJIkv4iQAAAA?w=204&h=299&c=7&r=0&o=5&pid=1.7",
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
    },
    {
      imgUrl:
        "https://th.bing.com/th/id/OIP.LNQKoXZDxBt5KE9DnXRp7AHaJo?w=204&h=265&c=7&r=0&o=5&pid=1.7",
      title:
        "你不知道的JavaScript（上卷）= You Don’t Know JS Scope & closures this & object prototypes",
      author: "Kyle Simpson",
      press: "人民邮电出版社",
      category: "计算机-编程",
      isbn: "7115385734",
      clcNo: "C32",
      binding: "锁线胶订",
      pages: 213,
      monetary: "人民币",
      price: 30,
      supplyInfo: "现货，三个月内到货",
    },
    {
      imgUrl:
        "https://th.bing.com/th/id/OIP.FeR3-SnwqU7yTOQEqC68kgHaKb?w=145&h=205&c=7&r=0&o=5&pid=1.7",
      title: "算法导论（原书第3版）",
      author: "Thomas H.Cormen",
      press: "机械工业出版社",
      category: "计算机-编程",
      isbn: "7111407016",
      clcNo: "P02",
      binding: "锁线胶订",
      pages: 415,
      monetary: "人民币",
      price: 99,
      supplyInfo: "现货，三个月内到货",
    },
    {
      imgUrl:
        "https://th.bing.com/th/id/OIP.-AfreNRzWTDfpWxYhqIzpAAAAA?w=153&h=180&c=7&r=0&o=5&pid=1.7",
      title:
        "英雄联盟：符文之地的故事（英雄联盟十周年纪念；拳头游戏官方出品；官方宇宙设定集；十年青春，此生无悔入联盟！）",
      author: "美国拳头游戏",
      press: "中信出版集团",
      category: "计算机-编程",
      isbn: "7521717031",
      clcNo: "Q84",
      binding: "锁线胶订",
      pages: 555,
      monetary: "人民币",
      price: 199,
      supplyInfo: "现货，三个月内到货",
    },
    {
      imgUrl:
        "https://th.bing.com/th/id/OIP.VmncT2M9BcViQgdzeXxHxgHaJw?w=153&h=201&c=7&r=0&o=5&pid=1.7",
      title: "素描的诀窍",
      author: "[美] 伯特·多德森",
      press: "上海人民美术出版社",
      category: "计算机-编程",
      isbn: "7532228703",
      clcNo: "F43",
      binding: "锁线胶订",
      pages: 200,
      monetary: "人民币",
      price: 70,
      supplyInfo: "现货，三个月内到货",
    },
    {
      imgUrl:
        "https://th.bing.com/th/id/OIP.LyU84f5ZzPxjFYc-tr3C8QAAAA?w=204&h=204&c=7&r=0&o=5&pid=1.7",
      title: "伯里曼人体结构绘画教学",
      author: "乔治·伯里曼",
      press: "广西美术出版社",
      category: "计算机-编程",
      isbn: "7806740651",
      clcNo: "P44",
      binding: "锁线胶订",
      pages: 200,
      monetary: "人民币",
      price: 55,
      supplyInfo: "现货，三个月内到货",
    },
    {
      imgUrl:
        "https://th.bing.com/th/id/OIP.TA2s0gBWWy_DBwG572BHoQAAAA?w=132&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Linux内核设计的艺术: 图解Linux操作系统架构设计与实现原理",
      author: "新设计团队",
      press: "机械工业出版社华章公司",
      category: "计算机-编程",
      isbn: "7111347447",
      clcNo: "I43",
      binding: "锁线胶订",
      pages: 800,
      monetary: "人民币",
      price: 180,
      supplyInfo: "现货，三个月内到货",
    },
  ],
  // 分页器数据
  pager: {
    total: 985014,
    pageSize: 10,
  },
  // 搜索框数据
  searchBoxData:{
    type:"title",
    value:""
  }
});

// 页面初始化

onMounted(() => {
  reqInterface.userLogin({ postId: 1 }).then((res) => {
    console.log(res);
  });
});

// 搜索逻辑
function onSearch() {
  if (state.searchBoxData.value === "") {
    message.error("输入内容为空，请检查！");
    return;
  }
  console.log(state.searchBoxData)
}
// 跳转详情逻辑
function openDetailsView(target) {
  utility.goTo("home-details", { isbn: target });
}
// 点击分页器逻辑
function clickPagination(index, page) {
  state.pager.pageSize = page;
  document.scrollingElement.scrollTop = 0;
  console.log(index, page);
}

// 点击二级树节点逻辑
function clickTreeNode(node) {
  // const reg = /-/g;
  console.log(node);
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
      margin-top: 50px;
      img {
        object-fit: contain;
        width: 100%;
      }
      span {
        color: #90a5a8;
        font-weight: 400;
        padding: 4px 0 15px 0;
        font-style: italic;
      }
    }
    .searchBox {
      width: 100%;
      #SearchBoxForm{
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
      }
    }
  }
}
</style>
