import {
  Keyboard,
  KeyboardAvoidingView as Container,
  KeyboardAvoidingViewProps,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

export function KeyboardAvoidingView({
  children,
  ...rest
}: KeyboardAvoidingViewProps) {
  return (
    <Container
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </Container>
  );
}
