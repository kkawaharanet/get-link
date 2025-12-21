import React, { createContext } from "react";
import { DEFAULT_PREFERENCES } from "./preferences";
import {
  IPreferencesService,
  usePreferencesService,
} from "./preferences-service";

const defaultPreferencesService: IPreferencesService = {
  loading: false,
  preferences: DEFAULT_PREFERENCES,
  setPreferences: () => {
    throw new Error("Function not implemented.");
  },
};

export const PreferencesServiceContext = createContext(
  defaultPreferencesService
);

export interface PreferencesServiceProviderProps {
  children: React.ReactNode;
}

export function PreferencesServiceProvider(
  props: PreferencesServiceProviderProps
) {
  const PreferencesService = usePreferencesService();

  return (
    <PreferencesServiceContext value={PreferencesService}>
      {props.children}
    </PreferencesServiceContext>
  );
}
