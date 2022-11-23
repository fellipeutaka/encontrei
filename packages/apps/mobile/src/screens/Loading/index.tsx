import { View } from "react-native";

import { Spinner } from "@encontrei/components/General/Spinner";

export function Loading() {
  return (
    <View className="flex-1 justify-center items-center">
      <Spinner />
    </View>
  );
}
