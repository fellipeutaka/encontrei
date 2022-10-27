import { TextProps } from "react-native";

import { StyledText } from "./styles";

export default function Label({ children, ...rest }: TextProps) {
  return <StyledText {...rest}>{children}</StyledText>;
}
