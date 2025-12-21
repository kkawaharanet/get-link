import { linkToString } from "@/link/link-functions";
import { LINK_TYPES, LinkType } from "@/link/link-type";
import { LinkServiceContext } from "@/link/LinkServiceProvider";
import { PreferencesServiceContext } from "@/preferences/PreferencesServiceProvider";
import { ChangeEvent, use } from "react";
import { Loading } from "../loading/Loading";
import styles from "./App.module.css";

export function App() {
  const linkService = use(LinkServiceContext);
  const preferencesService = use(PreferencesServiceContext);
  const loading = linkService.loading || preferencesService.loading;
  const [copied, setCopied] = useState(false);

  function handleFocus(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    event.target.select();
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
    });
  }

  function handleChangeLinkType(event: ChangeEvent<HTMLSelectElement>) {
    preferencesService.setPreferences({
      ...preferencesService.preferences,
      linkType: event.target.value as LinkType,
    });
    setCopied(false);
  }

  function handleChangeQueryParameters(event: ChangeEvent<HTMLInputElement>) {
    preferencesService.setPreferences({
      ...preferencesService.preferences,
      queryParameters: event.target.checked,
    });
    setCopied(false);
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  }

  const text = linkToString(
    linkService.link,
    preferencesService.preferences.linkType,
    !preferencesService.preferences.queryParameters
  );

  return (
    <div className={styles.container}>
      <dl className={styles.preferencesContainer}>
        <dt>{browser.i18n.getMessage("format")}</dt>
        <dd>
          <select
            defaultValue={preferencesService.preferences.linkType}
            onChange={handleChangeLinkType}
          >
            {LINK_TYPES.map((linkType) => (
              <option value={linkType} key={linkType}>
                {browser.i18n.getMessage(linkType)}
              </option>
            ))}
          </select>
        </dd>
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
      <textarea
        value={text}
        onFocus={handleFocus}
        className={styles.input}
        rows={8}
        readOnly
      />
      <button onClick={() => handleCopy(text)}>
        {browser.i18n.getMessage(copied ? "copied" : "copy")}
      </button>
    </div>
  );
}
