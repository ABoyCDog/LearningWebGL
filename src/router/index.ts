import { App } from "vue";
import TestRouter from "./modules/test";
import HomeRouter from "./modules/home";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const Layouts = () => import("@/layouts/index.vue");

export const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layouts,
    redirect: "/home",
    children: [...TestRouter, ...HomeRouter],
  },
];

// 创建路由
export const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
});
// export function resetRouter() {
//   router.getRoutes().forEach((route) => {
//     const { name } = route;
//     if (name) {
//       router.hasRoute(name) && router.removeRoute(name);
//     }
//   });
// }

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
