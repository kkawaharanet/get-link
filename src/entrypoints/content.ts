export default defineContentScript({
  matches: ["<all_urls>"],
  main: () => {
    document.addEventListener("contextmenu", (e) => {
      const anchor = (e.target as Element).closest("a[href]");
      const text = anchor ? (anchor as HTMLAnchorElement).innerText.trim() : "";
      browser.runtime.sendMessage({ type: "link-text", text });
    });
  },
});
