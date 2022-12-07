import { ScrollView, Switch, View } from "react-native";

import { useColorScheme } from "nativewind";

import { Feather } from "@encontrei/components/Icons/ExpoIcons";
import { colors } from "@encontrei/tailwind-config";

import { SettingsOption } from "../components/SettingsOption";

export function Appearance() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1 justify-center items-center dark:bg-zinc-900">
      <View className="w-full px-6">
        <ScrollView>
          <SettingsOption
            title="Tema escuro"
            icon={
              <Feather name="moon" size={20} className="dark:text-zinc-50" />
            }
            isTouchable={false}
            rightElement={
              <Switch
                value={colorScheme === "dark"}
                onValueChange={toggleColorScheme}
                trackColor={{
                  false: "#767676",
                  true: colors.violet[600],
                }}
                thumbColor="#FFFFFF"
              />
            }
          />
        </ScrollView>
      </View>
    </View>
  );
}
