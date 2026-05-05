import { LinkServiceProvider } from "@/link/LinkServiceProvider";
import { PreferencesServiceProvider } from "@/preferences/PreferencesServiceProvider";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { App, AppSkeleton } from "./app/App";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<AppSkeleton />}>
        <PreferencesServiceProvider>
          <LinkServiceProvider>
            <App />
          </LinkServiceProvider>
        </PreferencesServiceProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
