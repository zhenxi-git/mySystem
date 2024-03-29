import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../page/login.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
