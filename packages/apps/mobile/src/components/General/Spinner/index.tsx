import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

import { useTheme } from "styled-components/native";

export default function Spinner({
  size = "large",
  color,
  ...rest
}: ActivityIndicatorProps) {
  const theme = useTheme();
  return (
    <ActivityIndicator
      size={size}
      color={color || theme.colors.violet9}
      {...rest}
    />
  );
}
