import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "@encontrei/screens/Auth/SignIn";
import { SignUp } from "@encontrei/screens/Auth/SignUp";
import type { AuthStackParamsList } from "@encontrei/types/routes/ParamsList/Auth";

const Stack = createNativeStackNavigator<AuthStackParamsList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignIn"
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
