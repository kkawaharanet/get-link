export const LINK_TYPES = ["plaintext", "html", "markdown", "textile"] as const;
export type LinkType = (typeof LINK_TYPES)[number];
