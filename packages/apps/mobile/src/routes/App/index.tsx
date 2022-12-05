import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "nativewind";

import type { AppStackParamsList } from "@encontrei/@types/routes/ParamsList/App";
import {
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@encontrei/components/Icons/ExpoIcons";
import { ScrollIcon } from "@encontrei/components/Icons/ScrollIcon";
import { HomeStack } from "@encontrei/routes/Home";
/* import { SettingsStack } from "@encontrei/routes/Settings"; */
import { WithdrawStack } from "@encontrei/routes/Withdraw";
import { colors } from "@encontrei/tailwind-config";

const Tabs = createBottomTabNavigator<AppStackParamsList>();

export function AppStack() {
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerTintColor:
          colorScheme === "dark" ? colors.zinc[50] : colors.zinc[900],
        headerStyle: {
          backgroundColor:
            colorScheme === "dark" ? colors.zinc[900] : colors.zinc[50],
        },
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor:
            colorScheme === "dark" ? colors.zinc[800] : colors.zinc[100],
          borderTopWidth: 0,
          height: 64 + insets.bottom,
        },
      }}
      initialRouteName="Home"
    >
      <Tabs.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons
              name="home"
              size={20}
              color={focused ? colors.violet[600] : colors.zinc[600]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Withdraw"
        component={WithdrawStack}
        options={{
          title: "Meus pedidos",
          tabBarIcon: ({ focused }) => (
            <ScrollIcon
              color={focused ? colors.violet[600] : colors.zinc[600]}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              size={20}
              color={focused ? colors.violet[600] : colors.zinc[600]}
            />
          ),
        }}
      /> */}
    </Tabs.Navigator>
  );
}
