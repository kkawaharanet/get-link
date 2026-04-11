import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  manifest: {
    name: "__MSG_applicationName__",
    version: "3.1.0",
    description: "__MSG_description__",
    default_locale: "ja",
    permissions: ["scripting", "storage", "activeTab"],
    action: {
      default_title: "リンク取得",
      default_popup: "index.html",
      default_icon: {
        "16": "icon/16.png",
        "48": "icon/48.png",
        "128": "icon/128.png",
      },
    },
  },
});
