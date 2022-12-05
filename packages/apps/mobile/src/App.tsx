import { GestureHandlerRootView } from "react-native-gesture-handler";
import ToastContainer from "react-native-toast-message";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useSession } from "supabase-swr";

import { AppStack } from "@encontrei/routes/App";
import { AuthStack } from "@encontrei/routes/Auth";

export function App() {
  const session = useSession();
  const { colorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar
          style={colorScheme === "dark" ? "light" : "dark"}
          translucent
          backgroundColor="transparent"
        />
        {session ? <AppStack /> : <AuthStack />}
        <ToastContainer />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
