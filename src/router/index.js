import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Login",
    isHidden: true,
    component: () => import("../page/login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    isHidden: true,
    component: () => import("../page/home.vue"),
    children: [
      {
        path: "/home/page1",
        name: "page1",
        isHidden: true,
        component: () => import("../page/page1.vue"),
        meta:{
            keepAlive:true
        }
      },
      {
        path: "/home/page2",
        name: "page2",
        isHidden: true,
        component: () => import("../page/page2.vue"),
        meta:{
            keepAlive:true
        }
      }

    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
