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
        path: "/home",
        name: "home",
        component: () => import("../views/Home/HomeView.vue"),
      },
      {
        path: "/home/bookList",
        name: "home-bookList",
        component: () => import("../views/Home/BookListView.vue"),
      },
      {
        path:"/home/details",
        name:"home-details",
        component:() => import("../views/Home/Details.vue")
      }
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/LoginView.vue"),
  },
  {
    path:"/test",
    name:"test",
    component:()=>import("../views/test.vue")
  },
  // {
  //   // 404
  //   path: "/404",
  //   name: "404",
  //   component: () => import("../views/404"),
  // },
  // {
  //   path: "/:pathMatch(.*)",
  //   redirect: "/404",
  // },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;