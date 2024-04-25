import type { MouseEventHandler } from "react";

export type HamburgerMenuProps = {
  open: boolean;
  toggle: MouseEventHandler<HTMLAnchorElement>;
  session: boolean;
};

export type HamburgerProps = {
  open: boolean;
  toggle: MouseEventHandler<SVGElement>;
};
