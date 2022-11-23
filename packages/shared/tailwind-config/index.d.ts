import type { DefaultColors } from "tailwindcss/types/generated/colors";
import type { Config } from "tailwindcss/types/config";

declare module "@encontrei/tailwind-config" {
  export const config: Config;
  export const colors: DefaultColors;
}
