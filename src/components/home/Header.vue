<template>
  <div class="header">
    <div class="l">
      <a-tag
        color="#2db7f5"
        style="cursor: pointer"
        @click="utility.goTo('http://www.ctibooks.com.cn/#/')"
        >中国科技资料进出口</a-tag
      >
      <a-tag color="#87d068">共123745本书</a-tag>
      <a-tag
        color="#108ee9"
        style="cursor: pointer"
        @click="utility.goTo('home')"
        >书展主页</a-tag
      >
    </div>
    <div class="r">
      <div class="pc">
        <a-button type="text" @click="handleMenuClick({ key: '1' })"
          >我的书单</a-button
        >
        <a-button type="text" @click="handleMenuClick({ key: '2' })"
          >登出</a-button
        >
      </div>
      <div class="pe">
        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1"> 我的书单 </a-menu-item>
              <a-menu-item key="2"> 登出 </a-menu-item>
            </a-menu>
          </template>
          <a-button>
            <MenuOutlined />
          </a-button>
        </a-dropdown>
      </div>
    </div>
    <!-- 退出登录模态框 -->
    <a-modal
      :visible="visible"
      title="警告"
      ok-text="确认"
      cancel-text="取消"
      @cancel="hideModal('cancel')"
      @ok="hideModal('logOut')"
    >
      <p>
        登出后将会<span style="color: red">完全删除</span
        >我的书单内书籍信息，登出前请务必将书单导出备份。
      </p>
    </a-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MenuOutlined } from "@ant-design/icons-vue";
import utility from "../../utility/index";

const visible = ref(false);

function handleMenuClick(flag) {
  switch (flag.key) {
    case "1":
      console.log("我的书单");
      break;
    case "2":
      visible.value = true;
      break;
  }
}
function hideModal(flag) {
  switch (flag) {
    case "cancel":
      visible.value = false;
      break;
    case "logOut":
      console.log("执行登出逻辑");
      break;
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 0 15px;
  background: #f6f6f6;
  display: flex;
  justify-content: space-between;
  .ant-tag,
  .ant-btn {
    font-size: 14px;
  }
  .ant-btn {
    margin-left: 10px;
  }
  .r {
    padding: 15px 0;
    .pe {
      display: none;
    }
  }
}
@media screen and (max-width: 1080px) {
  // 正常电脑分辨率
}
@media screen and (max-width: 1024px) {
  // 低分辨率屏幕或者平板横向
}
@media screen and (max-width: 768px) {
  // 大分辨率手机或者平板垂直向上
  .header {
    .l {
      .ant-tag:nth-child(1) {
        display: none;
      }
    }
    .r {
      .pc {
        display: none;
      }
      .pe {
        display: block;
        .ant-btn {
          background: #f6f6f6;
        }
      }
    }
  }
}
@media screen and (max-width: 640px) {
  // 手机
}
</style>
