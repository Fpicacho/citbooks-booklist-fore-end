import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("../views/Home/IndexView.vue"),
    children: [
      {
        // 主页
        path: "/home",
        name: "home",
        component: () => import("../views/Home/HomeView.vue"),
        meta: {
          keepAlive: true,
        },
      },
      {
        // 我的书单
        path: "/home/bookList",
        name: "home-bookList",
        component: () => import("../views/Home/BookListView.vue"),
        meta: {
          keepAlive: false,
        },
      },
      {
        // 图书详情
        path: "/home/details",
        name: "home-details",
        component: () => import("../views/Home/DetailsView.vue"),
        meta: {
          keepAlive: false,
        },
      },
      {
        // 选书记录
        path: "/home/record",
        name: "home-record",
        component: () => import("../views/Home/RecordView.vue"),
        meta: {
          keepAlive: false,
        },
      },
      {
        // 选书记录详情
        path: "/home/record/:id",
        name: "home-record-RecordItem",
        component: () => import("../views/Home/RecordRecordItem.vue"),
      },
    ],
  },
  {
    // 登录
    path: "/login",
    name: "login",
    meta: {
      noAuth: true,
    },
    component: () => import("../views/Login/LoginView.vue"),
  },
  {
    // test
    path: "/test",
    name: "test",
    meta: {
      noAuth: true,
    },
    component: () => import("../views/test"),
  },
  {
    // 404
    path: "/404",
    name: "404",
    meta: {
      noAuth: true,
    },
    component: () => import("../views/404"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
    meta: {
      noAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
