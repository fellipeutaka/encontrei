import {
  gray,
  mauve,
  blackA,
  blue,
  red,
  green,
  purple,
  violet,
} from "@radix-ui/colors";

import theme from "./theme";

const lightTheme = {
  ...theme,
  colors: {
    ...gray,
    ...mauve,
    ...blackA,
    ...blue,
    ...red,
    ...green,
    ...purple,
    ...violet,
  },
};

export default lightTheme;
