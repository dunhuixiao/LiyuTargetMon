import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  hostname: "https://dunhuixiao.github.io/LiyuTargetMon/",
  author: "Cookie🥭",
  iconAssets: "iconfont",
  logo: "https://gcore.jsdelivr.net/gh/dunhuixiao/LiyuTargetMon@docs/image/favicon.ico",
  repo: "https://github.com/dunhuixiao/LiyuTargetMon",
  docsDir: "docs",
  docsBranch: "master",
  navbar: [
    { text: "💡 使用教程", link: "/guide/start" },
    { text: "🐣 下载", link: "/guide/download" },
    { text: "📄 FAQ", link: "/guide/faq" },
    { text: "✨ 更新日志", link: "/guide/change-log" },
    { text: "🐧 点击加入", link: "https://jq.qq.com/?_wv=1027&k=jmw5fLpn" },
  ],
  sidebar: [],
  copyright: false,
  footer:
    ' Copyright © 2017 - present <a href="https://github.com/dunhuixiao" target="_blank">Cookie🥭</a>',
  displayFooter: true,
  //主题色
  fullscreen: true,
  themeColor: {
      blue: "#2196f3",
      red: "#f26d6d",
      green: "#3eaf7c",
      orange: "#fb9b5f",
    },
  // 加密配置
  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
    },
  },

  plugins: {
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

    mdEnhance: {
      enableAll: true,
      locales: {
        "/":{
          tip:" "
        }
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});


