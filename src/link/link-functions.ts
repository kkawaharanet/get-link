import { Link } from "./link";
import { LinkType } from "./link-type";

export function getLink(): Promise<Link> {
  return new Promise((resolve) => {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const { url, title } = tabs.at(0)!;
      resolve({ url: url ?? "", title: title ?? "" });
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
