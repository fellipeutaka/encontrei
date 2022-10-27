import { ReactNode } from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";

import { Container, Text } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
  onPress: () => void;
  isLoading?: boolean;
};

export default function Button({
  children,
  onPress,
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <Container onPress={onPress} disabled={isLoading} {...rest}>
      {isLoading ? (
        <ActivityIndicator size="large" color="rgba(255, 255, 255, 0.2)" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}
