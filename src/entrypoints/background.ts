import { Link } from "@/link/link";
import { linkToString } from "@/link/link-format";
import { LINK_TYPES, LinkType } from "@/link/link-type";
import { DEFAULT_PREFERENCES, Preferences } from "@/preferences/preferences";

async function copyToClipboard(text: string) {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab.id) {
    return;
  }

  await browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: (t) => navigator.clipboard.writeText(t),
    args: [text],
  });
}

export default defineBackground(() => {
  let lastLinkText = "";

  const copyLinkParent = "copyLinkParent";

  browser.contextMenus.create({
    id: copyLinkParent,
    title: browser.i18n.getMessage("applicationName"),
    contexts: ["link"],
  });

  type I18nMessageKey = Parameters<typeof browser.i18n.getMessage>[0];
  const contextMenuTitleKeys: Record<LinkType, I18nMessageKey> = {
    plaintext: "copyAsPlaintext",
    csv: "copyAsCsv",
    tsv: "copyAsTsv",
    html: "copyAsHtml",
    markdown: "copyAsMarkdown",
    textile: "copyAsTextile",
  };

  for (const linkType of LINK_TYPES) {
    browser.contextMenus.create({
      id: linkType,
      parentId: copyLinkParent,
      title: browser.i18n.getMessage(contextMenuTitleKeys[linkType]),
      contexts: ["link"],
    });
  }

  // ChromeだとcontextMenus.onClicked.addListenerからリンクテキストを取得することができないので
  // 右クリックしたときにリンクテキストを保存しておく
  browser.runtime.onMessage.addListener((message) => {
    if (message.type === "link-text") {
      lastLinkText = message.text;
    }
  });

  browser.contextMenus.onClicked.addListener(async (info, _tab) => {
    const result = await browser.storage.local.get("preferences");
    const preferences: Preferences =
      (result.preferences as Preferences) ?? DEFAULT_PREFERENCES;

    const linkType = LINK_TYPES.find((t) => t === info.menuItemId);
    if (!linkType) {
      return;
    }

    const link: Link = { url: info.linkUrl ?? "", title: lastLinkText };
    copyToClipboard(linkToString(link, linkType, preferences.queryParameters));
  });
});
