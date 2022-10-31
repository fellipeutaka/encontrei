import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";

import { ScrollIcon } from "@encontrei/components/Icons/ScrollIcon";
import type { AppStackParamsList } from "@encontrei/types/routes/ParamsList/App";

import { HomeStack as Home } from "../Home";
import { SettingsStack as Settings } from "../Settings";
import { WithdrawStack as Withdraw } from "../Withdraw";

const Tabs = createBottomTabNavigator<AppStackParamsList>();

export function AppStack() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerTintColor: theme.colors.mauve12,
        headerStyle: {
          backgroundColor: theme.colors.mauve1,
        },
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.mauve2,
          borderTopWidth: 0,
          height: 64 + insets.bottom,
        },
      }}
      initialRouteName="Home"
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons
              name="home"
              size={20}
              color={focused ? theme.colors.violet9 : theme.colors.mauve10}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Withdraw"
        component={Withdraw}
        options={{
          title: "Meus pedidos",
          tabBarIcon: ({ focused }) => (
            <ScrollIcon
              color={focused ? theme.colors.violet9 : theme.colors.mauve10}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              size={20}
              color={focused ? theme.colors.violet9 : theme.colors.mauve10}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
