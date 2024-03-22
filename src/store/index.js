import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      routes: [
        {
          name: "首页",
          path: "/home",
          isHidden: false,
          redirect: "/home/page1",
          children: [
            {
              path: "/home/page1",
              name: "page1",
              isHidden: false,
              component: () => import("../page/page1.vue"),
              meta: {
                keepAlive: true,
                title: "页面一",
              },
            },

            {
              path: "/home/sonPage",
              name: "sonPage",
              isHidden: false,
              component: () => import("../page/sonPage.vue"),
              meta: {
                keepAlive: true,
                title: "子页面",
              },
            },
          ],
        },
        {
          path: "/home/page2",
          name: "page2",
          isHidden: false,
          component: () => import("../page/page2.vue"),
          meta: {
            keepAlive: true,
            title: "页面二",
          },
          children: [],
        },
      ],
    };
  },
  getters: {
    getMenu: (state) => {
      return state.routes;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});

export default store;
