import * as React from "react";
import { Typography as MuiTypography } from "@material-ui/core";

export interface TypographyProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit"
    | "srOnly";
  color?:
    | "initial"
    | "inherit"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error";
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  display?: "initial" | "block" | "inline";
  noWrap?: boolean;
  paragraph?: boolean;
  gutterBottom?: boolean;
}

export const Typography: React.FC<TypographyProps> = MuiTypography as any;
