import { useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import type { User } from "@supabase/supabase-js";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import { supabase } from "@encontrei/lib/supabase";
import { AppStack } from "@encontrei/routes/App";
import { AuthStack } from "@encontrei/routes/Auth";
import { Splash } from "@encontrei/screens/Splash";

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    setUser(supabase.auth.session()?.user ?? null);

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      data?.unsubscribe();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar
          style={colorScheme === "dark" ? "light" : "dark"}
          translucent
          backgroundColor="transparent"
        />
        {isLoading ? <Splash /> : user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
