import { useState } from "react";
import { ScrollView, Switch, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";

import { ScrollIcon } from "@encontrei/components/Icons/ScrollIcon";
import { colors } from "@encontrei/tailwind-config";

import { SettingsOption } from "../components/SettingsOption";

export function Notifications() {
  const [orderNotification, setOrderNotification] = useState(true);
  const { colorScheme } = useColorScheme();

  async function toggleNotification() {
    await AsyncStorage.setItem(
      "@encontrei/orderNotification",
      String(orderNotification)
    );
    setOrderNotification((state) => !state);
  }

  return (
    <View className="flex-1 justify-center items-center dark:bg-zinc-900">
      <View className="w-full px-6">
        <ScrollView>
          <SettingsOption
            title="Pedidos"
            icon={
              <ScrollIcon
                color={
                  colorScheme === "dark" ? colors.zinc[50] : colors.zinc[900]
                }
              />
            }
            isTouchable={false}
            rightElement={
              <Switch
                value={orderNotification}
                onValueChange={toggleNotification}
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
