import { Image, Text, TouchableOpacity, View } from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

import { colors } from "@encontrei/tailwind-config";

type ItemProps = {
  photoUrl: string;
  title: string;
  location: string;
  onPress: () => void;
  rightIcon?: JSX.Element;
};

export function Item({
  title,
  location,
  photoUrl,
  onPress,
  rightIcon,
}: ItemProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row justify-between items-center w-full h-24 px-3 my-3 rounded-lg border-2 border-zinc-600">
      <View className="flex-row justify-center items-center">
        <Image
          className="w-12 h-12 rounded-full"
          source={{
            uri: photoUrl,
          }}
        />
        <View className="ml-3 py-3">
          <Text className="text-zinc-900 dark:text-zinc-50 text-xl max-w-[10rem]">
            {title}
          </Text>
          <View className="flex-row items-center">
            <Ionicons
              name="location-outline"
              size={16}
              color={
                colorScheme === "dark" ? colors.zinc[50] : colors.zinc[900]
              }
            />
            <Text className="text-zinc-900 dark:text-zinc-50">{location}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}>
        {rightIcon ?? (
          <Feather
            name="eye"
            size={24}
            color={colorScheme === "dark" ? colors.zinc[50] : colors.zinc[900]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
