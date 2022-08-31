<template>
  <!-- 页脚 src\components\home\Footer.vue-->
  <div class="footer">
    <div class="l">
      <span class="item">自2022年免费线上书展</span>
      <a href="" class="item">fpicacho@gmail.com</a>
      <a href="" class="item">公司官网</a>
    </div>
    <div class="r">
      <span class="item">版权所有 © 中国科技资料进出口总公司</span>
      <span class="item">京ICP备11126448号</span>
      <span class="item">京公网安备 130040051243号</span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-top: 1px solid #eee;
  background: #f6f6f6;
  color: #888;
  .item {
    margin-right: 15px;
    &:nth-child(3) {
      margin-right: 0px;
    }
  }
}
@media screen and (max-width: 1080px) {
  // 正常电脑分辨率
}
@media screen and (max-width: 1024px) {
  // 低分辨率屏幕或者平板横向
  .footer {
    font-size: 12px;
  }
}
@media screen and (max-width: 768px) {
  // 大分辨率手机或者平板垂直向上
  .footer {
    flex-direction: column;
    .l {
      margin-bottom: 10px;
    }
  }
}
@media screen and (max-width: 640px) {
  // 手机
}
</style>
