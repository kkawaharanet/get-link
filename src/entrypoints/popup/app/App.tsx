import { Link } from "@/link/link";
import { getLinksInTab, linkToString } from "@/link/link-functions";
import { LINK_TYPES, LinkType } from "@/link/link-type";
import { LinkServiceContext } from "@/link/LinkServiceProvider";
import { PreferencesServiceContext } from "@/preferences/PreferencesServiceProvider";
import { ChangeEvent, use } from "react";
import { Loading } from "../loading/Loading";
import styles from "./App.module.css";

const APP_TABS = ["link", "linksInPage"] as const;
type AppTab = (typeof APP_TABS)[number];

interface LinkTabProps {
  link: Link;
  removeQueryParameters: boolean;
}

function LinkTab({ link, removeQueryParameters }: LinkTabProps) {
  function handleFocus(
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    event.target.select();
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className={styles.linkList}>
      {LINK_TYPES.map((type) => {
        const text = linkToString(link, type, removeQueryParameters);
        return (
          <div key={type} className={styles.linkRow}>
            <span className={styles.linkLabel}>
              {browser.i18n.getMessage(type)}
            </span>
            <div className={styles.linkRowControls}>
              {type === "plaintext" ? (
                <textarea
                  value={text}
                  className={styles.linkTextarea}
                  rows={2}
                  readOnly
                  onFocus={handleFocus}
                />
              ) : (
                <input
                  type="text"
                  value={text}
                  className={styles.linkTextarea}
                  readOnly
                  onFocus={handleFocus}
                />
              )}
              <button onClick={() => handleCopy(text)}>
                {browser.i18n.getMessage("copy")}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LinksInPageTab() {
  const preferencesService = use(PreferencesServiceContext);
  const [links, setLinks] = useState<Link[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [preferencesService.preferences]);

  function handleFocus(event: React.FocusEvent<HTMLTextAreaElement>) {
    event.target.select();
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
    });
  }

  async function handleGetLinksClick() {
    setLinks(await getLinksInTab());
  }

  if (links.length <= 0) {
    return (
      <button onClick={handleGetLinksClick}>
        {browser.i18n.getMessage("get")}
      </button>
    );
  }

  const value = links
    .map((l) =>
      linkToString(
        l,
        preferencesService.preferences.linkType,
        !preferencesService.preferences.queryParameters,
      ),
    )
    .join("\n");

  return (
    <>
      <textarea
        value={value}
        onFocus={handleFocus}
        className={styles.input}
        rows={8}
        wrap="off"
        readOnly
      />
      <button onClick={() => handleCopy(value)}>
        {browser.i18n.getMessage(copied ? "copied" : "copy")}
      </button>
    </>
  );
}

export function App() {
  const linkService = use(LinkServiceContext);
  const preferencesService = use(PreferencesServiceContext);
  const [activeTab, setActiveTab] = useState<AppTab>("link");
  const loading = linkService.loading || preferencesService.loading;

  function handleChangeLinkType(event: ChangeEvent<HTMLSelectElement>) {
    preferencesService.setPreferences({
      ...preferencesService.preferences,
      linkType: event.target.value as LinkType,
    });
  }

  function handleChangeQueryParameters(event: ChangeEvent<HTMLInputElement>) {
    preferencesService.setPreferences({
      ...preferencesService.preferences,
      queryParameters: event.target.checked,
    });
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  }

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
      {activeTab === "link" && (
        <LinkTab
          link={linkService.link}
          removeQueryParameters={
            !preferencesService.preferences.queryParameters
          }
        />
      )}
      {activeTab === "linksInPage" && <LinksInPageTab />}
      <dl className={styles.preferencesContainer}>
        {activeTab === "linksInPage" && (
          <>
            <dt>{browser.i18n.getMessage("format")}</dt>
            <dd>
              <select
                value={preferencesService.preferences.linkType}
                onChange={handleChangeLinkType}
              >
                {LINK_TYPES.map((linkType) => (
                  <option value={linkType} key={linkType}>
                    {browser.i18n.getMessage(linkType)}
                  </option>
                ))}
              </select>
            </dd>
          </>
        )}
        <dt>{browser.i18n.getMessage("queryParameters")}</dt>
        <dd>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="checkboxQueryParameters"
              checked={preferencesService.preferences.queryParameters}
              onChange={handleChangeQueryParameters}
            />
            <label htmlFor="checkboxQueryParameters">
              {browser.i18n.getMessage("enable")}
            </label>
          </div>
        </dd>
      </dl>
    </div>
  );
}
