import { LinkService } from "@/link/link-service";
import { use } from "react";
import styles from "./App.module.css";

export interface AppProps {
  linkServicePromise: Promise<LinkService>;
}

export function App(props: AppProps) {
  const linkService = use(props.linkServicePromise);
  const plaintext = `${linkService.link.title}\n${linkService.link.url}`;
  const html = `<a href="${linkService.link.url}">${linkService.link.title}</a>`;
  const markdown = `[${linkService.link.title}](${linkService.link.url} )`;
  const textile = `"${linkService.link.title}":${linkService.link.url}`;

  function handleFocus(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.target.select();
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className={styles.container}>
      <div>{browser.i18n.getMessage("plaintext")}</div>
      <div>
        <textarea
          value={plaintext}
          onFocus={handleFocus}
          className={styles.input}
          readOnly
        />
      </div>
      <div>
        <button onClick={() => handleCopy(plaintext)}>
          {browser.i18n.getMessage("copy")}
        </button>
      </div>
      <div>{browser.i18n.getMessage("html")}</div>
      <div>
        <input
          type="text"
          value={html}
          onFocus={handleFocus}
          className={styles.input}
          readOnly
        />
      </div>
      <div>
        <button>{browser.i18n.getMessage("copy")}</button>
      </div>
      <div>{browser.i18n.getMessage("markdown")}</div>
      <div>
        <input
          type="text"
          value={markdown}
          onFocus={handleFocus}
          className={styles.input}
          readOnly
        />
      </div>
      <div>
        <button>{browser.i18n.getMessage("copy")}</button>
      </div>
      <div>{browser.i18n.getMessage("textile")}</div>
      <div>
        <input
          type="text"
          value={textile}
          onFocus={handleFocus}
          className={styles.input}
          readOnly
        />
      </div>
      <div>
        <button>{browser.i18n.getMessage("copy")}</button>
      </div>
    </div>
  );
}
