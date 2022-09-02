import { defineStore } from "pinia";
import { message } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";
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
          title: "是否继续追加？",
          icon: createVNode(ExclamationCircleOutlined),
          okText: "确认",
          cancelText: "取消",
          content: createVNode(
            "div",
            { style: "color:red;" },
            `检测到书单中存在一本或多本《${targget.title}》是否继续追加？`
          ),
          onOk: () => {
            this.BOOK_LIST.push(targget);
            message.success(`已将《${targget.title}》加入至我的书单。`);
          },
          onCancel: () => {
            message.error(`放弃追加《${targget.title}》`);
          },
        });
      } else {
        this.BOOK_LIST.push(targget);
        message.success(`已将《${targget.title}》加入至我的书单。`);
      }
    },
    // 移除书单逻辑
    DeleteBookListItem(index,targget) {
      this.BOOK_LIST.splice(index, 1);
      message.success(`已将《${targget.title}》移除我的书单。`);
    },
  },
  // 开启本地化存储选项
  persist: true,
});
