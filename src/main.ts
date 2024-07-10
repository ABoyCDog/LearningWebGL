import { createApp } from "vue";
// import './style.css'
import { setupPlugins } from "./plugins/index.ts";
import { setupRouter } from "@/router";
import { setupGlobalComponent } from "@/components/setupGlobalComponent.ts";

import App from "./App.vue";

async function setupApp() {
  const app = createApp(App);

  // 安装插件
  setupPlugins(app);

  // 安装全局组件
  setupGlobalComponent(app);

  // 创建路由
  setupRouter(app);

  app.mount("#app");
}

setupApp();
