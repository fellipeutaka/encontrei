import "styled-components";
import dark from "@encontrei/themes/dark";

declare module "styled-components" {
  type ThemeType = typeof dark;
  export type DefaultTheme = {} & ThemeType
}
