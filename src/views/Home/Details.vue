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
                <div class="label">
                  <div class="lable-title">价格：</div>
                  <div>{{ bookDetails.price }} {{ bookDetails.monetary }}</div>
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
      <a-tabs v-model:activeKey="activeKey" style="margin-top: 15px">
        <a-tab-pane key="1" tab="图书简介">{{
          bookDetails.holdingInfo
        }}</a-tab-pane>
        <a-tab-pane key="2" tab="获奖信息">{{bookDetails.bookbInfo}}</a-tab-pane>
        <a-tab-pane key="3" tab="馆藏信息">{{bookDetails.briefInfo}}</a-tab-pane>
      </a-tabs>
      <!-- 获奖信息面板 -->
      <!-- <div class="xInfo">
        <div class="title">获奖信息</div>
        <div class="info">
          {{ bookDetails.briefInfo }}
        </div>
      </div> -->
      <!-- 图书简介面板 -->
      <!-- <div class="xInfo">
        <div class="title">图书简介</div>
        <div class="info">
          {{ bookDetails.bookbInfo }}
        </div>
      </div> -->
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
    "https://th.bing.com/th/id/OIP.TA2s0gBWWy_DBwG572BHoQAAAA?w=132&h=180&c=7&r=0&o=5&pid=1.7",
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
  bookbInfo: "在《百年孤独》发表之前，马尔克斯在拉丁美洲文坛之外并不广为人知。《百年孤独》刚一面世即震惊拉丁美洲文坛及整个西班牙语世界，并很快被翻译为多种语言。马尔克斯也一跃成为名噪一时的世界级作家。《百年孤独》的故事发生在虚构的马孔多镇（马尔克斯称威廉·福克纳为导师，显然深受其影响），描述了布恩迪亚家族百年七代的兴衰、荣辱、爱恨、福祸，和文化与人性中根深蒂固的孤独。其内容涉及社会和家庭生活的方方面面，可以说是拉丁美洲历史文化的浓缩投影。《百年孤独》风格独特，既气势恢宏又奇幻诡丽。粗犷处寥寥数笔勾勒出数十年内战的血腥冷酷；细腻处描写热恋中情欲煎熬如慕如诉；奇诡处人间鬼界过去未来变幻莫测。轻灵厚重，兼而有之，被公认为魔幻现实主义最具代表性的作品。被称为“20世纪用西班牙文写作的最杰出的长篇小说之一",
  briefInfo: "这馆藏信息我也不知道咋编",
  holdingInfo:
    "《百年孤独》是魔幻现实主义文学的代表作，描写了布恩迪亚家族七代人的传奇故事，以及加勒比海沿岸小镇马孔多的百年兴衰，反映了拉丁美洲一个世纪以来风云 变幻的历史。作品融入神话传说、民间故事、宗教典故等神秘因素，巧妙地糅合了现实与虚幻，展现出一个瑰丽的想象世界，成为20世界重要的经典文学巨著之一。1982年加西亚•马尔克斯获得诺贝尔文学奖，奠定世界级文学大师的地位，很大程度上乃是凭借《百年孤独》的巨大影响。何塞·阿尔卡蒂奥·布恩迪亚是西班牙人的后裔，住在远离海滨的一个印第安人的村庄。他与乌尔苏拉新婚时，由于乌尔苏拉害怕像姨母与叔父结婚那样生出长尾巴的孩子，每夜都穿上特制的紧身衣，拒绝与丈夫同房，因此他遭到村民的耻笑。何塞·阿尔卡蒂奥·布恩迪亚在一次斗鸡比赛胜利后杀死了讥笑他的普鲁邓希奥·阿基拉尔。从此，死者的鬼魂经常出现在他眼前。鬼魂那痛苦而凄凉的眼神，使他日夜不得安宁。于是何塞·阿尔卡蒂奥·布恩迪亚一家带着朋友及其家人离开村子，外出寻找安身之所，经过了两年多的跋涉，来到一片滩地上，由于受到梦的启示决定定居下来，建立村镇，这就是马孔多。布恩迪亚家族在马孔多的历史由此开始。 [2]  何塞·阿尔卡蒂奥·布恩迪亚是个极富创造性的人。他从吉卜赛人那里看到磁铁，便想用它来开采金子；看到放大镜可以聚焦太阳光，便试图研制出一种威力无比的武器；从吉卜赛人那里得到航海用的观像仪和六分仪，通过实验认识到“地球是圆的，像橙子”。他不满于自己所过的落后的生活。他向妻子抱怨说：“世界上正在发生不可思议的事情，咱们旁边，就在河流对岸，已有许多各式各样神奇的机器，可咱们仍在这儿像蠢驴一样过日子”。因为马孔多隐没在宽广的沼泽地中，与世隔绝。他决心要开辟出一条道路，把马孔多与外界的伟大发明连接起来。他带一帮人披荆斩棘干了两个多星期，却以失败告终。他痛苦地说：“咱们再也去不了任何地方啦，咱们会在这儿活活地烂掉，享受不到科学的好处了”。后来他又沉迷于炼金术，整天把自己关在实验室里。由于他的精神世界与马孔多狭隘、落后、保守的现实格格不入，他陷入孤独之中不能自拔，以至于精神失常，被家人绑在一棵大树上，几十年后才在那棵树上死去。乌尔苏拉成为家里的顶梁柱，去世时的年龄在115至122岁之间。",
});
const activeKey = ref("1");

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
