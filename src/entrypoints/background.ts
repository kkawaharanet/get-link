import { Link } from "@/link/link";
import { linkToString } from "@/link/link-functions";

async function copyToClipboard(text: string) {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab.id) return;

  await browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: (t) => navigator.clipboard.writeText(t),
    args: [text],
  });
}

export default defineBackground(() => {
  let lastLinkText = "";

  const copyLinkParent = "copyLinkParent";
  const copyLinkAsPlaintext = "copyLinkAsPlaintext";
  const copyLinkAsCsv = "copyLinkAsCsv";
  const copyLinkAsTsv = "copyLinkAsTsv";
  const copyLinkAsHtml = "copyLinkAsHtml";
  const copyLinkAsMarkdown = "copyLinkAsMarkdown";
  const copyLinkAsTextile = "copyLinkAsTextile";

  browser.contextMenus.create({
    id: copyLinkParent,
    title: browser.i18n.getMessage("applicationName"),
    contexts: ["link"],
  });

  browser.contextMenus.create({
    id: copyLinkAsPlaintext,
    parentId: copyLinkParent,
    title: browser.i18n.getMessage("copyAsPlaintext"),
    contexts: ["link"],
  });

  browser.contextMenus.create({
    id: copyLinkAsCsv,
    parentId: copyLinkParent,
    title: browser.i18n.getMessage("copyAsCsv"),
    contexts: ["link"],
  });

  browser.contextMenus.create({
    id: copyLinkAsTsv,
    parentId: copyLinkParent,
    title: browser.i18n.getMessage("copyAsTsv"),
    contexts: ["link"],
  });

  browser.contextMenus.create({
    id: copyLinkAsHtml,
    parentId: copyLinkParent,
    title: browser.i18n.getMessage("copyAsHtml"),
    contexts: ["link"],
  });

  browser.contextMenus.create({
    id: copyLinkAsMarkdown,
    parentId: copyLinkParent,
    title: browser.i18n.getMessage("copyAsMarkdown"),
    contexts: ["link"],
  });

  browser.contextMenus.create({
    id: copyLinkAsTextile,
    parentId: copyLinkParent,
    title: browser.i18n.getMessage("copyAsTextile"),
    contexts: ["link"],
  });

  browser.runtime.onMessage.addListener((message) => {
    if (message.type === "link-text") {
      lastLinkText = message.text;
    }
  });

  browser.contextMenus.onClicked.addListener(async (info, _tab) => {
    const link: Link = { url: info.linkUrl ?? "", title: lastLinkText };

    if (info.menuItemId === copyLinkAsPlaintext) {
      copyToClipboard(linkToString(link, "plaintext", false));
    } else if (info.menuItemId === copyLinkAsCsv) {
      copyToClipboard(linkToString(link, "csv", false));
    } else if (info.menuItemId === copyLinkAsTsv) {
      copyToClipboard(linkToString(link, "tsv", false));
    } else if (info.menuItemId === copyLinkAsHtml) {
      copyToClipboard(linkToString(link, "html", false));
    } else if (info.menuItemId === copyLinkAsMarkdown) {
      copyToClipboard(linkToString(link, "markdown", false));
    } else if (info.menuItemId === copyLinkAsTextile) {
      copyToClipboard(linkToString(link, "textile", false));
    }
  });
});
