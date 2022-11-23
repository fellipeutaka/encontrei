import { View, Dimensions } from "react-native";

import LottieView from "lottie-react-native";

import research from "@encontrei/assets/research.json";

export function Splash() {
  return (
    <View className="flex-1 justify-center items-center bg-zinc-50 dark:bg-zinc-900">
      <LottieView
        source={research}
        autoPlay
        resizeMode="contain"
        hardwareAccelerationAndroid
        duration={2500}
        style={{
          width: Dimensions.get("window").width / 2,
          height: Dimensions.get("window").width / 2,
        }}
      />
    </View>
  );
}
