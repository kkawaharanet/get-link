import { getLinkService } from "@/link/link-service";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { App } from "./app/App";
import { Loading } from "./loading/Loading";
import "./style.css";

function Root() {
  const linkServicePromise = getLinkService();

  return (
    <ErrorBoundary
      FallbackComponent={(props: FallbackProps) => <div>{props.error}</div>}
    >
      <Suspense fallback={<Loading />}>
        <App linkServicePromise={linkServicePromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
