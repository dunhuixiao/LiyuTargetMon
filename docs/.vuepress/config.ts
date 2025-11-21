import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import theme from "./theme";

const basePath = "LiyuTargetMon";

export default defineUserConfig({
  // 站点配置
  base: `/${basePath}/`,
  lang: "zh-CN",
  title: "鲤鱼监控",
  description: "鲤鱼监控",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://gcore.jsdelivr.net/gh/dunhuixiao/LiyuTargetMon@docs/image/favicon.ico",
      },
    ],
  ],
  // 主题和它的配置
  theme: theme,
  bundler: viteBundler(),
  //插件
  plugins: [],
});
