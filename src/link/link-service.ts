import { use } from "react";
import { Link } from "./link";
import { getLink } from "./link-functions";

const linkPromise = getLink();

export interface ILinkService {
  link: Link;
}

export function useLinkService(): ILinkService {
  const link = use(linkPromise);
  return { link };
}
