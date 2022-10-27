import { Vibration } from "react-native";

export function vibrate(
  pattern?: number | number[] | null,
  repeat?: boolean | null
) {
  return Vibration.vibrate(pattern, repeat);
}
