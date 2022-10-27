import {
  grayDark,
  mauveDark,
  blackA,
  blueDark,
  redDark,
  greenDark,
  purpleDark,
  violetDark,
} from "@radix-ui/colors";

import theme from "./theme";

const darkTheme = {
  ...theme,
  colors: {
    ...grayDark,
    ...mauveDark,
    ...blackA,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...purpleDark,
    ...violetDark,
  },
};

export default darkTheme;
