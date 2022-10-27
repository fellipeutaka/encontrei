import { ReactNode } from "react";

import { Container, Text } from "./styles";

interface LinkButtonProps {
  children: ReactNode;
  onPress: () => void;
}

export default function LinkButton({ children, onPress }: LinkButtonProps) {
  return (
    <Container onPress={onPress}>
      <Text>{children}</Text>
    </Container>
  );
}
