<template>
  <!-- 登录页面 src\views\Login\LoginView.vue -->
  <div class="loginView">
    <!-- 登录面板 -->
    <div class="loginPanel">
      <img
        class="panelLogo"
        src="../../assets/img/logo.png"
        alt="logo图像资源加载失败"
      />
      <p class="decorativeTtext">Single Sign In</p>
      <a-form>
        <a-input class="idIpt" placeholder="组织账户" maxlength="24" />
        <a-input-password class="pwdIpt" placeholder="密码" maxlength="24" />
      </a-form>
      <a-button class="loginBtn" type="primary">登录</a-button>
      <div class="registerBox">
        <span>没有账户？</span>
        <a-button @click="showModal">注册</a-button>
      </div>
    </div>
    <!-- 注册提示框 -->
    <a-modal v-model:visible="visible" title="注册指南" @ok="showModal">
      <p>
        中国科技资料进出口总公司线上书展系统采用邀请注册制，我们愿与各大高校/企业组织建立合作关系xxx，如您的组织/高效有图书购买需求请联系我们
        电话：188888888888888
      </p>
    </a-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
const visible = ref(false);

function showModal() {
  visible.value = !visible.value;
}
</script>

<style lang="scss" scoped>
.loginView {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../../assets/img/loginBackground.jpg");
  background-position: center;
  background-size: auto 100%;
  .loginPanel {
    width: 400px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    padding: 25px 20px;
    .panelLogo {
      width: 100%;
      margin-bottom: 25px;
    }
    .decorativeTtext {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      color: #434343;
      border-bottom: none;
    }
    .idIpt {
      margin-bottom: 15px;
    }
    .pwdIpt {
      margin-bottom: 25px;
    }
    .loginBtn {
      width: 100%;
      margin-bottom: 45px;
    }
    .registerBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
}
@media screen and (max-width: 640px) {
  // 手机
  .loginView {
    .loginPanel {
      width: 90%;
    }
  }
}
</style>
