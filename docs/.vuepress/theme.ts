import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  hostname: "https://dunhuixiao.github.io/LiyuTargetMon/",
  author: "Cookie🥭",
  logo: "https://gcore.jsdelivr.net/gh/dunhuixiao/LiyuTargetMon@docs/image/favicon.ico",
  repo: "https://github.com/dunhuixiao/LiyuTargetMon",
  docsDir: "docs",
  docsBranch: "master",
  navbar: [
    { text: "💡 使用教程", link: "/guide/start" },
    { text: "🐣 下载", link: "/guide/download" },
    { text: "📄 FAQ", link: "/guide/faq" },
    { text: "✨ 更新日志", link: "/guide/change-log" },
    { text: "🐧 加入QQ群", link: "https://jq.qq.com/?_wv=1027&k=jmw5fLpn" },
  ],
  sidebar: [],
  copyright: false,
  footer:
    ' Copyright © 2017 - present <a href="https://github.com/dunhuixiao" target="_blank">Cookie🥭</a>',
  displayFooter: true,
  //主题色
  fullscreen: true,
  themeColor: true,
  // 加密配置
  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
    },
  },

  // Markdown 增强配置（新版格式）
  markdown: {
    align: true,
    attrs: true,
    breaks: false,
    component: true,
    demo: true,
    figure: true,
    footnote: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,
    codeTabs: true,
  },

  plugins: {
    // 图标插件配置
    icon: {
      assets: "fontawesome",
    },
    search: {
      locales: {
        "/": { placeholder: "搜索" },
        "/en/": { placeholder: "Search" },
      },
      isSearchable: (page) => page.path !== "/",
    },
    // 如果你不需要评论，可以直接删除 comment 配置，
    // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
    // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
    comment: {
      /**
       * Using Giscus
       */
      provider: "Giscus",
      repo: "dunhuixiao/LiyuTargetMon",
      repoId: "MDEwOlJlcG9zaXRvcnkyMTkyMDM5ODE=",
      category: "Announcements",
      categoryId: "DIC_kwDODRDJjc4CP4oR",
      /**
       * Using Twikoo
       */
      // provider: "Twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",
      /**
       * Using Waline
       */
      // provider: "Waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    // mdEnhance: {
    //   enableAll: true,
    //   presentation: {
    //     plugins: ["highlight", "math", "search", "notes", "zoom"],
    //   },
    // },
  },
});


