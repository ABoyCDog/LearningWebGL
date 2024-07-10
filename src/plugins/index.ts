import { App } from "vue";
import setupAssets from "./assets.ts";
import setupElementPlus from "./element-plus.ts";

export function setupPlugins(app: App) {
  setupAssets();
  setupElementPlus(app);
}
