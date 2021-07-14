import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/video-list",
    name: "VideoList",
    component: () => import("../views/VideoList.vue"),
  },
  {
    path: "/video-label",
    name: "VideoLabel",
    component: () => import("../views/VideoLabel.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("../views/Setting.vue"),
  },
  {
    path: "/video/:id",
    name: "Video",
    component: () => import("../views/Video.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    // 修改页面标题
    document.title = to.meta.title;
  }
  next();
});

export default router;
