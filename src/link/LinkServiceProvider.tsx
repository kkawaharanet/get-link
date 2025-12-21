import React, { createContext } from "react";
import { ILinkService, useLinkService } from "./link-service";

const defaultLinkService: ILinkService = {
  loading: false,
  link: { title: "", url: "" },
};

export const LinkServiceContext = createContext(defaultLinkService);

export interface LinkServiceProviderProps {
  children: React.ReactNode;
}

export function LinkServiceProvider(props: LinkServiceProviderProps) {
  const linkService = useLinkService();

  return (
    <LinkServiceContext value={linkService}>
      {props.children}
    </LinkServiceContext>
  );
}
