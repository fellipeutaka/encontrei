import {
  Keyboard,
  KeyboardAvoidingViewProps,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

import { Container } from "./styles";

export default function KeyboardAvoidingView({
  children,
  ...rest
}: KeyboardAvoidingViewProps) {
  return (
    <Container
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </Container>
  );
}
