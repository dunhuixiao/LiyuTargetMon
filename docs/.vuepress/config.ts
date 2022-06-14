import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { searchPlugin } from "@vuepress/plugin-search";

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
        href: "https://fastly.jsdelivr.net/gh/dunhuixiao/LiyuTargetMon@docs/image/favicon.ico",
      },
    ],
  ],
  // 主题和它的配置
  theme: theme,
  //插件
  plugins: [
    searchPlugin({
      locales: {
        "/": { placeholder: "搜索" },
        "/en/": { placeholder: "Search" },
      },
      // hotKeys:['CTRL','K'],
      // 排除首页
      isSearchable: (page) => page.path !== "/",
    }),
  ],
});
