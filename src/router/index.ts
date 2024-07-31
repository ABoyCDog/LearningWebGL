import { App } from 'vue';
import { basicRoutes } from './modules/basic';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const Layouts = () => import('@/layouts/index.vue');

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layouts,
    redirect: '/webgl/home',
    children: [...basicRoutes],
  },
];

// 创建路由
export const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
});

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
