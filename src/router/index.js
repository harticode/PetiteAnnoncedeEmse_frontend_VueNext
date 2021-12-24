import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/sign-in",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/downTown",
      component: () => import("../views/DownTown.vue"),
    },
    {
      path: "/requests",
      component: () => import("../views/Requests.vue"),
    },
    {
      path: "/confessions",
      component: () => import("../views/Confessions.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../views/Home.vue"),
    },
  ],
});

export default router;
