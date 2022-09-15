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
      <a-form :model="formState" @finish="onFinish">
        <a-form-item
          label=""
          name="account"
          :rules="[{ required: true, message: '请输入账户!' }]"
        >
          <a-input placeholder="组织账户" v-model:value="formState.account" />
        </a-form-item>
        <a-form-item
          label=""
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password
            placeholder="请输入密码"
            v-model:value="formState.password"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" style="width: 100%"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
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
import reqInterface from "../../api/reqInterface";
import utility from "../../utility/index";
import { message } from "ant-design-vue";
import { useUserInfoStore } from "../../store/userInfoStore";
const { USER_INFO } = useUserInfoStore();
const { SetBookShowId, SetBookShowName, SetId, SetBookCount } =
  useUserInfoStore();
const visible = ref(false);
const formState = ref({
  account: "",
  password: "",
});

function showModal() {
  visible.value = !visible.value;
}

// 提交表单逻辑
function onFinish(value) {
  reqInterface.userLogin(value).then((res) => {
    if (res.data.success === "1") {
      SetBookShowName(res.data.user.bookShowName);
      SetBookShowId(res.data.user.bookShowId);
      SetId(res.data.user.id);
      SetBookCount(res.data.user.bookCount);
      message.success(`登录成功！欢迎${USER_INFO.bookShowName}`);
      utility.goTo("home");
    } else {
      formState.value.account = "";
      formState.value.password = "";
    }
  });
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
