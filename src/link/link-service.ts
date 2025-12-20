import { Link } from "./link";

export interface LinkService {
  link: Link;
}

export function getLinkService(): Promise<LinkService> {
  return new Promise((resolve) => {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const { url, title } = tabs.at(0)!;
      resolve({ link: { url: url ?? "", title: title ?? "" } });
    });
  });
}
