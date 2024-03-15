import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    isHidden: true,
    redirect: "/login",
    component: () => import("../page/login.vue"),
  },
  {
    path: "/login",
    name: "Login",
    isHidden: true,
    component: () => import("../page/login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    isHidden: true,
    redirect: "/login",
    component: () => import("../page/home.vue"),
    children: [
      {
        path: "/home/page1",
        name: "page1",
        isHidden: true,
        component: () => import("../page/page1.vue"),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/home/page2",
        name: "page2",
        isHidden: true,
        component: () => import("../page/page2.vue"),
        meta: {
          keepAlive: true,
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
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    // 访问的路径在白名单
    if (whiteList.includes(to.path.toLowerCase())) {
        next()
    } else {
        if (sessionStorage.getItem('token')) {
            next()
        } else {
            next('/login')
        }
    }
})
export default router;
