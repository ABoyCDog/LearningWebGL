import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

// 创建svg图标插件
export function configSvgIconsPlugin(isBuild = false) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],

    // 打包时启用svgo进行优化
    svgoOptions: isBuild,

    symbolId: "icon-[dir]-[name]",
  });
  return svgIconsPlugin;
}
