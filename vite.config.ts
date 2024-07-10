import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import svgLoader from "vite-svg-loader";
import { configSvgIconsPlugin } from "./build/vite/plugin/svg-icon";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const isBuild = command === "build";

  return {
    plugins: [
      vue(),
      vueJsx(),
      svgLoader({ defaultImport: "url" }),
      configSvgIconsPlugin(isBuild),
    ],
    resolve: {
      // alias: {
      //   "@": path.resolve(__dirname, "src"),
      // },
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
      ],
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    css: {
      // 预处理器配置项
      preprocessorOptions: {
        less: {
          // math: 'always',
          // globalVars: {
          //   // 定义全局变量
          //   // 例如在全局样式中可以直接使用 @primary-color
          //   // 也可以在vue组件中使用 $primary-color
          // },
          // modifyVars: {},
        },
      },
    },
  };
});
