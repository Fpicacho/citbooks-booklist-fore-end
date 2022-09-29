<template>
  <!-- 页脚 src\components\home\Footer.vue-->
  <div class="footer">
    <div class="l">
      <span class="item">{{ $t("footer.Copywriting") }}</span>
      <a href="mailto:admin@ctibook.com" class="item">admin@ctibook.com</a>
      <a href="http://www.ctibooks.com.cn/#/" class="item">{{
        $t("footer.officialWeb")
      }}</a>
    </div>
    <div class="r">
      <span class="item">{{ $t("footer.copyright") }}</span>
      <span class="item">{{ $t("footer.beian1") }}</span>
      <span class="item">{{ $t("footer.baian2") }}</span>
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
