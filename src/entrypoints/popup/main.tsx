import { LinkServiceProvider } from "@/link/LinkServiceProvider";
import { PreferencesServiceProvider } from "@/preferences/PreferencesServiceProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PreferencesServiceProvider>
      <LinkServiceProvider>
        <App />
      </LinkServiceProvider>
    </PreferencesServiceProvider>
  </React.StrictMode>
);
