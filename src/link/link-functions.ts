import { Link } from "./link";

export async function getActiveTab(): Promise<Browser.tabs.Tab> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (tabs.length === 0) {
    throw new Error("Failed to get active tab id");
  }
  return tabs[0];
}

export async function getLink(): Promise<Link> {
  const tab = await getActiveTab();
  return { url: tab.url ?? "", title: tab.title ?? "" };
}

export async function getLinksInTab(): Promise<Link[]> {
  const tab = await getActiveTab();
  const results = await browser.scripting.executeScript({
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
  });
  return results[0].result!;
}
