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
        <a-input-search
          v-model:value="searchValue"
          placeholder="按书名、作者、出版社、ISBN 搜索"
          enter-button="搜索"
          size="large"
          @search="onSearch"
        />
        <span class="categorySearch" @click="onShowDrawer">按分类搜索</span>
      </div>
      <!-- 图书列表容器 -->
      <div class="bookList">
        <BookItem
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
      </div>
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
        @close="onShowDrawer"
      >
        <!-- 二级树 -->
        <a-tree
          v-if="state.treeData.length"
          :tree-data="state.treeData"
          :block-node="true"
          :defaultExpandAll="true"
          @select="clickTreeNode"
        />
      </a-drawer>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import BookItem from "../../components/home/homeView/BookItem.vue";
import { message } from "ant-design-vue";
import utility from "../../utility/index";
import { useBookListStore } from "../../store/bookListStore";
const { SetBookListItem } = useBookListStore();

const searchValue = ref("");
const visible = ref(false);
const state = reactive({
  // 二级树数据
  treeData: [
    {
      title: "计算机",
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
        "https://covers.zlibcdn2.com/covers100/books/22/23/1b/22231bcea1f27535d345696b14890988.jpg",
      title: "斗罗大陆",
      author: "唐家三少",
      press: "湖南少年儿童出版社",
      category:"计算机-编程",
      isbn: "7556242331",
      clcNo: "A10",
      binding: "锁线胶订",
      pages: 931,
      monetary: "人民币",
      price: 80,
      supplyInfo:"库存现货，数量1"
    },
    {
      imgUrl:
        "https://covers.zlibcdn2.com/covers299/books/41/65/cb/4165cb82efa3cd92976330d3396232c0.jpg",
      title: "科学的超电磁炮 SS 1",
      author: "镰池和馬",
      press: "epub掌上書苑",
      category:"计算机-编程",
      isbn: "1174981576",
      clcNo: "B122",
      binding: "锁线胶订",
      pages: 150,
      monetary: "人民币",
      price: 30,
      supplyInfo:"现货，三个月内到货"
    },
    {
      imgUrl:
        "https://covers.zlibcdn2.com/covers299/books/86/24/38/8624386d57d77bd6f1502cb53a465583.jpg",
      title: "青春猪头少年不会梦到兔女郎学姐",
      author: "鸭志田一",
      press: "中信出版社",
      category:"计算机-编程",
      isbn: "B072C29BL1",
      clcNo: "B22",
      binding: "方背平脊精装",
      pages: 999,
      monetary: "美元",
      price: 100,
      supplyInfo:"现货，三个月内到货"
    },
    {
      imgUrl:
        "https://covers.zlibcdn2.com/covers299/books/7f/06/13/7f061349f720330e27c93802e42ed4fb.jpg",
      title: "日本动漫绘画中的线条设计",
      author: "上村雅春",
      press: "电子工业出版社",
      category:"计算机-编程",
      isbn: "7121310074",
      clcNo: "Z12",
      binding: "锁线胶订",
      pages: 200,
      monetary: "日元",
      price: 5000,
      supplyInfo:"现货，三个月内到货"
    },
    {
      imgUrl:
        "https://covers.zlibcdn2.com/covers299/books/ad/07/3a/ad073a4a3b1690ba5d363f9c59b785b3.jpg",
      title:
        "你不知道的JavaScript（上卷）= You Don’t Know JS Scope & closures this & object prototypes",
      author: "Kyle Simpson",
      press: "人民邮电出版社",
      category:"计算机-编程",
      isbn: "7115385734",
      clcNo: "C32",
      binding: "锁线胶订",
      pages: 213,
      monetary: "人民币",
      price: 30,
      supplyInfo:"现货，三个月内到货"
    },
    {
      imgUrl:
        "https://covers.zlibcdn2.com/covers299/books/64/6c/d7/646cd72f167420516ef79b88700dc8d1.jpg",
      title: "算法导论（原书第3版）",
      author: "Thomas H.Cormen",
      press: "机械工业出版社",
      category:"计算机-编程",
      isbn: "7111407016",
      clcNo: "P02",
      binding: "锁线胶订",
      pages: 415,
      monetary: "人民币",
      price: 99,
      supplyInfo:"现货，三个月内到货"
    },
    {
      imgUrl:
        "https://covers.zlibcdn2.com/covers299/books/4e/11/21/4e11216a86a3fd10a79e02de9e4e3e51.jpg",
      title:
        "英雄联盟：符文之地的故事（英雄联盟十周年纪念；拳头游戏官方出品；官方宇宙设定集；十年青春，此生无悔入联盟！）",
      author: "美国拳头游戏",
      press: "中信出版集团",
      category:"计算机-编程",
      isbn: "7521717031",
      clcNo: "Q84",
      binding: "锁线胶订",
      pages: 555,
      monetary: "人民币",
      price: 199,
      supplyInfo:"现货，三个月内到货"
    },
    {
      imgUrl:
        "https://covers.zlibcdn2.com/covers299/books/c2/48/08/c2480807e34a24e8c2033719c2b3a7f4.jpg",
      title: "素描的诀窍",
      author: "[美] 伯特·多德森",
      press: "上海人民美术出版社",
      category:"计算机-编程",
      isbn: "7532228703",
      clcNo: "F43",
      binding: "锁线胶订",
      pages: 200,
      monetary: "人民币",
      price: 70,
      supplyInfo:"现货，三个月内到货"
    },
    {
      imgUrl:
        "https://covers.zlibcdn2.com/covers299/books/97/ec/db/97ecdbcf09c0b5ef67f4df7806c50ec9.jpg",
      title: "伯里曼人体结构绘画教学",
      author: "乔治·伯里曼",
      press: "广西美术出版社",
      category:"计算机-编程",
      isbn: "7806740651",
      clcNo: "P44",
      binding: "锁线胶订",
      pages: 200,
      monetary: "人民币",
      price: 55,
      supplyInfo:"现货，三个月内到货"
    },
    {
      imgUrl:
        "https://covers.zlibcdn2.com/covers299/books/10/df/e5/10dfe5485f01e3fa079786d2838af2bd.jpg",
      title: "Linux内核设计的艺术: 图解Linux操作系统架构设计与实现原理",
      author: "新设计团队",
      press: "机械工业出版社华章公司",
      category:"计算机-编程",
      isbn: "7111347447",
      clcNo: "I43",
      binding: "锁线胶订",
      pages: 800,
      monetary: "人民币",
      price: 180,
      supplyInfo:"现货，三个月内到货"
    },
  ],
  // 分页器数据
  pager: {
    total: 985014,
    pageSize: 10,
  },
});

// 搜索逻辑
function onSearch() {
  if (searchValue.value === "") {
    message.error("输入内容为空，请检查！");
    return;
  }
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
// 开启二级树逻辑
function onShowDrawer() {
  visible.value = !visible.value;
}
// 点击二级树节点逻辑
function clickTreeNode(node) {
  const reg = /-/g;
  if (reg.test(node[0])) {
    console.log(node[0]);
  }
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
    width: 970px;
    margin: 0 auto;
    padding: 0 15px;
    .logoBox {
      display: flex;
      flex-direction: column;
      width: 400px;
      text-align: center;
      margin-top: 50px;
      span {
        color: #90a5a8;
        font-weight: 400;
        padding: 4px 0 15px 0;
        font-style: italic;
      }
    }
    .searchBox {
      width: 100%;
      .categorySearch {
        display: inline-block;
        padding-top: 15px;
        border-bottom: 1px dashed;
        color: #777;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .bookList {
      width: 100%;
      margin-top: 40px;
      border: 1px solid #aaa;
      background: #fff;
      .bookItem:nth-last-child(1) {
        border-bottom: none;
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
