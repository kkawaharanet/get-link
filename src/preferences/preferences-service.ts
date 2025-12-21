import { DEFAULT_PREFERENCES, Preferences } from "./preferences";

export interface IPreferencesServiceState {
  loading: boolean;
  preferences: Preferences;
}

export interface IPreferencesService {
  loading: boolean;
  preferences: Preferences;
  setPreferences(preferences: Preferences): Promise<void>;
}

export function usePreferencesService(): IPreferencesService {
  const key = "preferences";
  const [state, setState] = useState<IPreferencesServiceState>({
    loading: true,
    preferences: DEFAULT_PREFERENCES,
  });

  function getPreferences(): Promise<Preferences> {
    return new Promise((resolve) => {
      browser.storage.local.get<{ preferences: Preferences }>(key, (result) => {
        resolve(result[key] ?? DEFAULT_PREFERENCES);
      });
    });
  }

  function setPreferences(value: Preferences): Promise<void> {
    return new Promise((resolve) => {
      const obj: any = {};
      obj[key] = value;
      browser.storage.local.set(obj, () => {
        setState((v) => ({ ...v, preferences: value }));
        resolve();
      });
    });
  }

  useEffect(() => {
    getPreferences().then((value) => {
      setState({ loading: false, preferences: value });
    });
  }, []);

  return {
    loading: state.loading,
    preferences: state.preferences,
    setPreferences,
  };
}
