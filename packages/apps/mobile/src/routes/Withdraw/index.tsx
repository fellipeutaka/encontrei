import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useColorScheme } from "nativewind";
import type { WithdrawStackParamsList } from "src/@types/routes/ParamsList/App/Withdraw";

// import { Accepted } from "@encontrei/screens/App/Withdraw/Accepted";
// import { Refused } from "@encontrei/screens/App/Withdraw/Refused";
import { Sent } from "@encontrei/screens/App/Withdraw/Sent";
import { colors } from "@encontrei/tailwind-config";

const Stack = createMaterialTopTabNavigator<WithdrawStackParamsList>();

export function WithdrawStack() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="Sent"
      screenOptions={{
        tabBarStyle: {
          backgroundColor:
            colorScheme === "dark" ? colors.zinc[900] : colors.zinc[50],
        },
        tabBarLabelStyle: {
          textTransform: "capitalize",
        },
        tabBarActiveTintColor: colors.violet[600],
        tabBarInactiveTintColor: colors.zinc[900],
        tabBarIndicatorStyle: {
          backgroundColor: colors.violet[600],
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
              color={focused ? colors.violet[600] : colors.zinc[900]}
            />
          ),
        }}
      />
      {/*       <Stack.Screen
        name="Accepted"
        component={Accepted}
        options={{
          title: "Aceitos",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="checkmark"
              size={24}
              color={focused ? colors.violet[600] : colors.zinc[900]}
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
              color={focused ? colors.violet[600] : colors.zinc[900]}
            />
          ),
        }}
      /> */}
    </Stack.Navigator>
  );
}
