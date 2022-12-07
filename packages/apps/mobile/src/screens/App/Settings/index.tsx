import { ScrollView, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import type { SettingsStackNavigationProps } from "@encontrei/@types/routes/NavigationProps/App/Settings";
import {
  AntDesign,
  Feather,
  Ionicons,
} from "@encontrei/components/Icons/ExpoIcons";

import { SettingsOption } from "./components/SettingsOption";

export function Settings() {
  const { navigate } = useNavigation<SettingsStackNavigationProps>();

  return (
    <View className="flex-1 justify-center items-center bg-zinc-50 dark:bg-zinc-900">
      <View className="w-full px-6">
        <ScrollView>
          <SettingsOption
            title="Conta"
            icon={
              <Feather
                name="user"
                size={20}
                className="text-zinc-900 dark:text-zinc-50"
              />
            }
            onPress={() => navigate("Account")}
          />
          <SettingsOption
            title="Notificações"
            icon={
              <Ionicons
                name="notifications-outline"
                size={20}
                className="text-zinc-900 dark:text-zinc-50"
              />
            }
            onPress={() => navigate("Notifications")}
          />
          <SettingsOption
            title="Aparência"
            icon={
              <Feather
                name="eye"
                size={20}
                className="text-zinc-900 dark:text-zinc-50"
              />
            }
            onPress={() => navigate("Appearance")}
          />
          <SettingsOption
            title="Sobre"
            icon={
              <AntDesign
                name="questioncircleo"
                size={20}
                className="text-zinc-900 dark:text-zinc-50"
              />
            }
            onPress={() => navigate("About")}
          />
        </ScrollView>
      </View>
    </View>
  );
}
