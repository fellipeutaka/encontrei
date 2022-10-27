import { Alert, Platform, ToastAndroid } from "react-native";

export default function Toast(
  title: string,
  text: string,
  duration = ToastAndroid.LONG
) {
  if (Platform.OS === "ios") {
    Alert.alert(title, text);
  } else {
    ToastAndroid.show(text, duration);
  }
}
