import { ScrollView, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import type { SettingsStackNavigationProps } from "@encontrei/@types/routes/NavigationProps/App/Settings";
import {
  AntDesign,
  Feather,
  Ionicons,
} from "@encontrei/components/Icons/ExpoIcons";
import { SettingsOption } from "@encontrei/screens/App/Settings/components/SettingsOption";

export function Settings() {
  const { navigate } = useNavigation<SettingsStackNavigationProps>();

  return (
    <View className="flex-1 items-center bg-zinc-50 dark:bg-zinc-900 pt-32 px-6">
      <ScrollView>
        <SettingsOption
          title="Conta"
          icon={
            <Feather
              name="user"
              className="w-5 h-5 text-zinc-900 dark:text-zinc-50"
            />
          }
          onPress={() => navigate("Account")}
        />
        <SettingsOption
          title="Notificações"
          icon={
            <Ionicons
              name="notifications-outline"
              className="w-5 h-5 text-zinc-900 dark:text-zinc-50"
            />
          }
          onPress={() => navigate("Notifications")}
        />
        <SettingsOption
          title="Aparência"
          icon={
            <Feather
              name="eye"
              className="w-5 h-5 text-zinc-900 dark:text-zinc-50"
            />
          }
          onPress={() => navigate("Appearence")}
        />
        <SettingsOption
          title="Sobre"
          icon={
            <AntDesign
              name="questioncircleo"
              size={20}
              className="w-5 h-5 text-zinc-900 dark:text-zinc-50"
            />
          }
          onPress={() => navigate("About")}
        />
      </ScrollView>
    </View>
  );
}
