import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "styled-components/native";

import Home from "@encontrei/screens/App/Settings";
import About from "@encontrei/screens/App/Settings/About";
import Account from "@encontrei/screens/App/Settings/Account";
import Appearence from "@encontrei/screens/App/Settings/Appearence";
import Notifications from "@encontrei/screens/App/Settings/Notifications";
import { SettingsStackParamsList } from "@encontrei/types/routes/ParamsList/App/Settings";

const Stack = createNativeStackNavigator<SettingsStackParamsList>();

export default function SettingsStack() {
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
        name="Appearence"
        component={Appearence}
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
