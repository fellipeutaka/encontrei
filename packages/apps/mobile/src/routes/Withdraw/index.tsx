import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "styled-components/native";

import Accepted from "@encontrei/screens/App/Withdraw/Accepted";
import Refused from "@encontrei/screens/App/Withdraw/Refused";
import Sent from "@encontrei/screens/App/Withdraw/Sent";
import { WithdrawStackParamsList } from "@encontrei/types/routes/ParamsList/App/Withdraw";

const Stack = createMaterialTopTabNavigator<WithdrawStackParamsList>();

export default function WithdrawStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Sent"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.mauve1,
        },
        tabBarLabelStyle: {
          textTransform: "capitalize",
        },
        tabBarActiveTintColor: theme.colors.violet9,
        tabBarInactiveTintColor: theme.colors.mauve12,
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.violet9,
        },
      }}
    >
      <Stack.Screen
        name="Sent"
        component={Sent}
        options={{
          title: "Enviados",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="paper-plane-outline"
              size={24}
              color={focused ? theme.colors.violet9 : theme.colors.mauve12}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Accepted"
        component={Accepted}
        options={{
          title: "Aceitos",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="checkmark"
              size={24}
              color={focused ? theme.colors.violet9 : theme.colors.mauve12}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Refused"
        component={Refused}
        options={{
          title: "Recusados",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="close-outline"
              size={24}
              color={focused ? theme.colors.violet9 : theme.colors.mauve12}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
