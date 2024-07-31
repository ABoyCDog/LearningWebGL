import type { RouteRecordRaw } from 'vue-router';
import Cesium from './cesium';
import WebGL from './webgl';
import EmptyRouterView from '@/views/routerViews/emptyRouterViews.vue';

export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/webgl',
    component: EmptyRouterView,
    meta: {
      title: 'WebGL',
      icon: 'webgl',
    },
    children: [...WebGL],
  },
  {
    path: '/cesium',
    component: EmptyRouterView,
    meta: {
      title: 'Cesium',
      icon: 'cesium',
    },
    children: [...Cesium],
  },
  {
    path: '/three',
    component: EmptyRouterView,
    meta: {
      title: 'Three',
      icon: 'three',
    },
    // children: [],
  },
  {
    path: '/babylon',
    component: EmptyRouterView,
    meta: {
      title: 'Babylon',
      icon: 'babylon',
    },
    // children: [],
  },
];
