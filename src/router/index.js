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
    ],
  },
  {
    // 登录
    path: "/login",
    name: "login",
    meta: {
      keepAlive: false,
    },
    component: () => import("../views/Login/LoginView.vue"),
  },
  {
    // 404
    path: "/404",
    name: "404",
    meta: {
      keepAlive: false,
    },
    component: () => import("../views/404"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
    meta: {
      keepAlive: false,
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
