import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    isHidden: false,
    redirect: "/login",
    component: () => import("../page/login.vue"),
  },
  {
    path: "/login",
    name: "Login",
    isHidden: false,
    component: () => import("../page/login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    isHidden: false,
    redirect:"/home/page1",
    meta: {
      title: "主页",
    },
    component: () => import("../page/home.vue"),
    children: [
      {
        path: "/home/page1",
        name: "page1",
        isHidden: false,
        component: () => import("../page/page1.vue"),
        meta: {
          keepAlive: true,
          title: "page1",
        },
      },
      {
        path: "/home/sonPage",
        name: "sonPage",
        isHidden: false,
        component: () => import("../page/sonPage.vue"),
        meta: {
          keepAlive: true,
          title: "sonPage",
        },
      },
      {
        path: "/home/page2",
        name: "page2",
        isHidden: false,
        component: () => import("../page/page2.vue"),
        meta: {
          keepAlive: true,
          title: "page2",
        },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 访问的白名单, 可以直接通行
const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  // 访问的路径在白名单
  if (whiteList.includes(to.path.toLowerCase())) {
    next();
  } else {
    if (sessionStorage.getItem("token")) {
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
