import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "styled-components/native";

import List from "@encontrei/screens/App/Home";
import Add from "@encontrei/screens/App/Home/Add";
import Details from "@encontrei/screens/App/Home/Details";
import type { HomeStackParamsList } from "@encontrei/types/routes/ParamsList/App/Home";

const Stack = createNativeStackNavigator<HomeStackParamsList>();

export function HomeStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "fade_from_bottom",
        headerTintColor: theme.colors.mauve12,
        headerTitleStyle: {
          color: theme.colors.mauve12,
        },
        headerStyle: {
          backgroundColor: theme.colors.mauve1,
        },
        headerBackTitleVisible: false,
      }}
      initialRouteName="List"
    >
      <Stack.Screen
        name="List"
        component={List}
        options={{
          title: "Itens perdidos",
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add"
        component={Add}
        options={{
          title: "Novo item",
        }}
      />
    </Stack.Navigator>
  );
}
