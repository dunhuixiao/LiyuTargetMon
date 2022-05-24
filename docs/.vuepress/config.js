const { searchPlugin } = require("@vuepress/plugin-search");
const { defaultTheme } = require("vuepress");

module.exports = {
  // 站点配置
  base: `/LiyuTargetMon/`,
  lang: "zh-CN",
  title: "鲤鱼监控",
  description: "鲤鱼监控",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://cdn.jsdelivr.net/gh/dunhuixiao/LiyuTargetMon@docs/image/favicon.ico",
      },
    ],
    [
      "script",
      { type: "text/javascript", src: "/js/jsdelivr-auto-fallback/index.min.js" },
    ],
  ],
  // 主题和它的配置
  //theme: "@vuepress/theme-default",
  theme: defaultTheme({
    navbar: [
      { text: "使用须知", link: "/guide/start" },
      { text: "下载", link: "/guide/download" },
      { text: "FAQ", link: "/guide/faq" },
      { text: "更新日志", link: "/guide/change-log" },
    ],
    logo: null,
    repo: "https://github.com/dunhuixiao/LiyuTargetMon",
    sidebar: "auto",
    editLinkText: "编辑此页",
    docsBranch: "master",
    docsDir: "docs",
    lastUpdatedText: "上次更新时间",
    toggleDarkMode: "切换夜间模式",
    contributors: false,
    tip: " ",
    warning: " ",
  }),
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
};
