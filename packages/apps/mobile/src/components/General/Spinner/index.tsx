import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

import { colors } from "@encontrei/tailwind-config";

export function Spinner({ size = "large", ...rest }: ActivityIndicatorProps) {
  return <ActivityIndicator size={size} color={colors.violet[600]} {...rest} />;
}
