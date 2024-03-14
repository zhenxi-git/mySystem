import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      routes: [
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
