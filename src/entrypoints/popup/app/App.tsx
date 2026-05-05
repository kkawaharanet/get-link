import { LINK_TYPES } from "@/link/link-type";
import styles from "./App.module.css";
import { LinkTab } from "./LinkTab";
import { LinksInPageTab } from "./LinksInPageTab";

const APP_TABS = ["link", "linksInPage"] as const;
type AppTab = (typeof APP_TABS)[number];

export function AppSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        {APP_TABS.map((appTab, index) => (
          <button
            className={styles.tabButton}
            disabled={index === 0}
            key={appTab}
          >
            {browser.i18n.getMessage(appTab)}
          </button>
        ))}
      </div>
      <div className={styles.linkList}>
        {LINK_TYPES.map((type) => (
          <div key={type} className={styles.linkRow}>
            <span className={styles.linkLabel}>
              {browser.i18n.getMessage(type)}
            </span>
            <div className={styles.linkRowControls}>
              {type === "plaintext" ? (
                <textarea
                  className={styles.linkTextarea}
                  rows={2}
                  readOnly
                  value=""
                />
              ) : (
                <input
                  type="text"
                  className={styles.linkTextarea}
                  readOnly
                  value=""
                />
              )}
              <button disabled>{browser.i18n.getMessage("copy")}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("link");

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        {APP_TABS.map((appTab) => (
          <button
            onClick={() => setActiveTab(appTab)}
            className={styles.tabButton}
            disabled={appTab === activeTab}
            key={appTab}
          >
            {browser.i18n.getMessage(appTab)}
          </button>
        ))}
      </div>
      {activeTab === "link" && <LinkTab />}
      {activeTab === "linksInPage" && <LinksInPageTab />}
    </div>
  );
}
