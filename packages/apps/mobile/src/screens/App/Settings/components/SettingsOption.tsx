import { TouchableOpacity, View, Text } from "react-native";

import { Feather } from "@encontrei/components/Icons/ExpoIcons";

type SettingsOptionProps = {
  icon: JSX.Element;
  title: string;
  rightElement?: JSX.Element;
  isTouchable?: boolean;
  onPress?: () => void;
};

export function SettingsOption({
  icon,
  title,
  rightElement,
  isTouchable = true,
  onPress,
}: SettingsOptionProps) {
  const Option = (
    <>
      <View className="flex-row">
        {icon}
        <Text className="text-zinc-900 dark:text-zinc-50 ml-3">{title}</Text>
      </View>
      {rightElement ?? (
        <Feather
          name="chevron-right"
          className="w-5 h-5 text-zinc-800 dark:text-zinc-100"
        />
      )}
    </>
  );

  return (
    <View className="flex-row justify-between items-center border border-zinc-600/50 h-16">
      {isTouchable ? (
        <TouchableOpacity
          className="flex-row justify-between items-center w-full h-full"
          {...onPress}
        >
          {Option}
        </TouchableOpacity>
      ) : (
        Option
      )}
    </View>
  );
}
