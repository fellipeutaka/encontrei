import { View } from "react-native";

import { Spinner } from "@encontrei/components/General/Spinner";

export function Loading() {
  return (
    <View className="flex-1 justify-center items-center bg-zinc-50 dark:bg-zinc-900">
      <Spinner />
    </View>
  );
}
