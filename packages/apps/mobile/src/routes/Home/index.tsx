import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "nativewind";
import type { HomeStackParamsList } from "src/@types/routes/ParamsList/App/Home";

import { Home } from "@encontrei/screens/App/Home";
import { Add } from "@encontrei/screens/App/Home/Add";
import { Details } from "@encontrei/screens/App/Home/Details";
import { colors } from "@encontrei/tailwind-config";

const Stack = createNativeStackNavigator<HomeStackParamsList>();

export function HomeStack() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "fade_from_bottom",
        headerTintColor:
          colorScheme === "dark" ? colors.zinc[50] : colors.zinc[900],
        headerTitleStyle: {
          color: colorScheme === "dark" ? colors.zinc[50] : colors.zinc[900],
        },
        headerStyle: {
          backgroundColor:
            colorScheme === "dark" ? colors.zinc[900] : colors.zinc[50],
        },
        headerBackTitleVisible: false,
      }}
      initialRouteName="List"
    >
      <Stack.Screen
        name="List"
        component={Home}
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
