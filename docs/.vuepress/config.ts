import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: "zh-CN",
  title: "鲤鱼监控",
  description: "鲤鱼监控",
  dest: "public",
  // 主题和它的配置
  theme: "@vuepress/theme-default",
  themeConfig: {
    navbar: [
      { text: "使用须知", link: "/guide/start" },
      { text: "FAQ", link: "/guide/faq" },
      { text: "更新日志", link: "/guide/change-log" }
    ],
    logo: null,
    repo:"https://github.com/dunhuixiao/LiyuTargetMon",
    sidebar: "auto",
    editLinkText:"编辑此页",
    docsBranch:"master",
    docsDir:"docs",
    lastUpdatedText: "上次更新时间",
    toggleDarkMode: "切换夜间模式",
    contributors:false,
    tip:" "
  },
  //插件
  plugins: [
    [
      "@vuepress/plugin-search",
      {
        locales: {
          "/": { placeholder: "Search" },
          "/zh/": { placeholder: "搜索文档" },
        },
        // hotKeys:['CTRL','K'],
        // 排除首页
        isSearchable: (page) => page.path !== '/',
      },
    ]
  ],
});
