import { defineStore } from "pinia";
import { message } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";
import i18n from "@/i18n";
const { t } = i18n.global;
// 全局书单容器
export const useBookListStore = defineStore("bookListStore", {
  state: () => {
    return {
      BOOK_LIST: [],
    };
  },
  actions: {
    // 加入书单逻辑
    SetBookListItem(targget) {
      const flag = this.BOOK_LIST.some((item) => {
        if (item.isbn === targget.isbn) {
          return true;
        }
      });
      if (flag) {
        Modal.confirm({
          title: t("BooklistInfo.AppendTitle"),
          icon: createVNode(ExclamationCircleOutlined),
          okText: t("BooklistInfo.okText"),
          cancelText: t("BooklistInfo.cancelText"),
          content: createVNode(
            "div",
            { style: "color:red;" },
            `${t("BooklistInfo.AppendInfo")}${targget.title}${t(
              "BooklistInfo.AppendInfo2"
            )}`
          ),
          onOk: () => {
            this.BOOK_LIST.push(targget);
            message.success(
              `${t("BooklistInfo.AppendInfo3")}${targget.title}${t(
                "BooklistInfo.AppendInfo4"
              )}`
            );
          },
          onCancel: () => {
            message.error(
              `${t("BooklistInfo.AppendInfo5")}${targget.title}${t(
                "BooklistInfo.AppendInfo6"
              )}`
            );
          },
        });
      } else {
        this.BOOK_LIST.push(targget);
        message.success(`${t('BooklistInfo.AppendInfo3')}${targget.title}${t('BooklistInfo.AppendInfo4')}`);
      }
    },
    // 移除书单逻辑
    DeleteBookListItem(index, targget) {
      this.BOOK_LIST.splice(index, 1);
      message.success(`${t('BooklistInfo.AppendInfo3')}${targget.title}${t('BooklistInfo.AppendInfo7')}`);
    },
  },
  // 开启本地化存储选项
  persist: true,
});
