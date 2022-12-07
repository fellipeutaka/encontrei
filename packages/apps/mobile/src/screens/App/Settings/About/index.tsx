import { View, Text } from "react-native";

export function About() {
  return (
    <View className="flex-1 justify-center items-center bg-zinc-50 dark:bg-zinc-900">
      <Text className="text-2xl font-medium dark:text-zinc-50">Encontrei</Text>
      <Text className="text-base dark:text-zinc-200">Versão 1.2.0</Text>
      <Text className="text-base dark:text-zinc-200">&copy; 2022</Text>
    </View>
  );
}
