<template>
  <!-- 全局组件 页头 src\components\home\Header.vue -->
  <div class="header">
    <div class="l">
      <a-tag color="#f50">{{ USER_INFO.bookShowName }}</a-tag>
      <a-tag color="#2db7f5"
        >{{ $t("Header.bookcount") }}{{ USER_INFO.bookCount
        }}{{ $t("Header.bookcount2") }}</a-tag
      >
      <a-tag
        color="#87d068"
        style="cursor: pointer"
        @click="utility.goTo('home')"
        >{{ $t("Header.homePage") }}</a-tag
      >
    </div>
    <div class="r">
      <div class="pc">
        <a-button type="text" @click="handleMenuClick({ key: '1' })"
          >{{$t("Header.bookList")}}</a-button
        >
        <a-button
          type="text"
          @click="handleMenuClick({ key: '3' })"
          v-if="USER_INFO.citUser"
          >{{$t("Header.record")}}</a-button
        >
        <a-button type="text" @click="handleMenuClick({ key: '2' })"
          >{{$t("Header.logOut")}}</a-button
        >
        <a-button type="text" @click="handleMenuClick({ key: '4' })">{{
          I18n_STATE
        }}</a-button>
      </div>
      <div class="pe">
        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1"> {{$t("Header.bookList")}} </a-menu-item>
              <a-menu-item key="3" v-if="USER_INFO.citUser">
                {{$t("Header.record")}}
              </a-menu-item>
              <a-menu-item key="2"> {{$t("Header.logOut")}} </a-menu-item>
              <a-menu-item key="4"> {{ I18n_STATE }} </a-menu-item>
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
      :title="$t('PromptInfo.Warn')"
      :ok-text="$t('BooklistInfo.okText')"
      :cancel-text="$t('BooklistInfo.cancelText')"
      @cancel="hideModal('cancel')"
      @ok="hideModal('logOut')"
    >
      <p>
        {{$t('PromptInfo.logoutText')}}<span style="color: red">{{$t('PromptInfo.logoutText2')}}</span
        >{{$t('PromptInfo.logoutText3')}}
      </p>
    </a-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { MenuOutlined } from "@ant-design/icons-vue";
import utility from "../../utility/index";
import { useUserInfoStore } from "../../store/userInfoStore";
import { useI18nStateStore } from "../../store/i18nStore";
const { USER_INFO } = useUserInfoStore();
const { I18n_STATE } = storeToRefs(useI18nStateStore());
const { SetBookShowName } = useI18nStateStore();
const visible = ref(false);

function handleMenuClick(flag) {
  switch (flag.key) {
    case "1":
      utility.goTo("home-bookList");
      break;
    case "2":
      visible.value = true;
      break;
    case "3":
      utility.goTo("home-record");
      break;
    case "4":
      SetBookShowName();
      break;
  }
}
function hideModal(flag) {
  switch (flag) {
    case "cancel":
      visible.value = false;
      break;
    case "logOut":
      localStorage.clear();
      location.reload();
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
