export default [
  {
    path: 'home',
    name: 'homeIndex',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      icon: 'home',
      activePath: '/home',
    },
  },
  {
    path: 'triangle',
    name: 'triangle',
    component: () => import('@/views/webgl/triangle.vue'),
    meta: {
      title: '渲染三角形',
      icon: 'triangle',
      activePath: '/webgl/triangle',
    },
  },
];
