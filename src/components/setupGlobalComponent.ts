import type { App } from "vue";
import SvgIcon from "@/components/svg-icon/index.vue";
import SvgHover from "@/components/svg-hover/index.vue";
import "virtual:svg-icons-register";

// 注册全局组件
export function setupGlobalComponent(app: App) {
  app.component("SvgIcon", SvgIcon);
  app.component("SvgHover", SvgHover);
}
