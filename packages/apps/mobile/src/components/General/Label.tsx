import { Text, TextProps } from "react-native";

export function Label(props: TextProps) {
  return (
    <Text
      className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 self-start"
      {...props}
    />
  );
}
