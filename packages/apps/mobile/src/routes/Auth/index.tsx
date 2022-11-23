import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { AuthStackParamsList } from "@encontrei/@types/routes/ParamsList/Auth";
import { Forget } from "@encontrei/screens/Auth/Forget";
import { SignIn } from "@encontrei/screens/Auth/SignIn";
import { SignUp } from "@encontrei/screens/Auth/SignUp";

const Stack = createNativeStackNavigator<AuthStackParamsList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignIn"
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Forget" component={Forget} />
    </Stack.Navigator>
  );
}
