import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "nativewind";
import type { SettingsStackParamsList } from "src/@types/routes/ParamsList/App/Settings";

import { Settings as Home } from "@encontrei/screens/App/Settings";
import { About } from "@encontrei/screens/App/Settings/About";
import { Account } from "@encontrei/screens/App/Settings/Account";
import { Appearance } from "@encontrei/screens/App/Settings/Appearance";
import { Notifications } from "@encontrei/screens/App/Settings/Notifications";
import { colors } from "@encontrei/tailwind-config";

const Stack = createNativeStackNavigator<SettingsStackParamsList>();

export function SettingsStack() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerTintColor:
          colorScheme === "dark" ? colors.zinc[50] : colors.zinc[900],
        headerStyle: {
          backgroundColor:
            colorScheme === "dark" ? colors.zinc[900] : colors.zinc[50],
        },
        headerBackTitleVisible: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Configurações",
        }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          title: "Conta",
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: "Notificações",
        }}
      />
      <Stack.Screen
        name="Appearance"
        component={Appearance}
        options={{
          title: "Aparência",
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: "Sobre",
        }}
      />
    </Stack.Navigator>
  );
}
