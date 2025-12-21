import { Link } from "./link";
import { LinkType } from "./link-type";

export function getActiveTab(): Promise<Browser.tabs.Tab> {
  return new Promise((resolve) => {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length <= 0) {
        throw new Error("Failed to get active tab id");
      }
      resolve(tabs[0]);
    });
  });
}

export async function getLink(): Promise<Link> {
  const tab = await getActiveTab();
  return { url: tab.url ?? "", title: tab.title ?? "" };
}

export async function getLinksInTab(): Promise<Link[]> {
  const tab = await getActiveTab();
  return new Promise((resolve) => {
    browser.scripting
      .executeScript({
        target: { tabId: tab.id! },
        func: () => {
          const anchors = Array.from(
            document.querySelectorAll("a[href]")
          ) as HTMLAnchorElement[];
          return anchors
            .filter((anchor) => anchor.innerText.length >= 1)
            .map((anchor) => ({
              url: anchor.href,
              title: anchor.innerText.replaceAll("\n", ""),
            }));
        },
      })
      .then((results) => {
        resolve(results[0].result!);
      });
  });
}

export function toQueryParametersRemovedUrl(url: string): string {
  try {
    const u = new URL(url);
    if (u.origin == "null") {
      return url;
    }
    return u.origin + u.pathname;
  } catch {
    // 文字列がURLではない
    return url;
  }
}

export function linkToString(
  link: Link,
  type: LinkType,
  removeQueryParameters: boolean
): string {
  const url = removeQueryParameters
    ? toQueryParametersRemovedUrl(link.url)
    : link.url;
  switch (type) {
    case "csv":
      return `${url},${link.title}`;
    case "tsv":
      return `${url}\t${link.title}`;
    case "html":
      return `<a href="${url}">${link.title}</a>`;
    case "markdown":
      return `[${link.title}](${url})`;
    case "textile":
      return `"${link.title}":${url}`;
    default:
      return `${link.title}\n${url}`;
  }
}
