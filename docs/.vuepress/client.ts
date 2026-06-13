import { defineClientConfig } from "@vuepress/client";
import CurrentVersion from "./components/CurrentVersion.vue";
import DownloadLinks from "./components/DownloadLinks.vue";

export default defineClientConfig({
  enhance({ app }) {
    app.component("CurrentVersion", CurrentVersion);
    app.component("DownloadLinks", DownloadLinks);
  },
});
