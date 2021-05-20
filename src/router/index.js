import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "Home",
    component: () =>
      import("../views/Home.vue"),
  },
  {
    path: "/video-list",
    name: "VideoList",
    component: () =>
      import("../views/VideoList.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () =>
      import("../views/Setting.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
