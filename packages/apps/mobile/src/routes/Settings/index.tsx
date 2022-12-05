import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { SettingsStackParamsList } from "src/@types/routes/ParamsList/App/Settings";
import { useTheme } from "styled-components/native";

import { Settings as Home } from "@encontrei/screens/App/Settings";
import { About } from "@encontrei/screens/App/Settings/About";
import { Account } from "@encontrei/screens/App/Settings/Account";
import { Appearance } from "@encontrei/screens/App/Settings/Appearance";
import { Notifications } from "@encontrei/screens/App/Settings/Notifications";

const Stack = createNativeStackNavigator<SettingsStackParamsList>();

export function SettingsStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerTintColor: theme.colors.mauve12,
        headerStyle: {
          backgroundColor: theme.colors.mauve1,
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
