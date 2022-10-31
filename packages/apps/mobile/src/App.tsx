import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import type { User } from "@supabase/supabase-js";
import { StatusBar } from "expo-status-bar";

import { useCustomTheme } from "@encontrei/hooks/useCustomTheme";
import { supabase } from "@encontrei/lib/supabase";
import { AppStack } from "@encontrei/routes/App";
import { AuthStack } from "@encontrei/routes/Auth";
import { Splash } from "@encontrei/screens/Splash";

export function App() {
  const { currentTheme } = useCustomTheme();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    setUser(supabase.auth.session()?.user || null);

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      data?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <>
        <StatusBar
          style={currentTheme === "dark" ? "light" : "dark"}
          translucent
          backgroundColor="transparent"
        />
        <Splash />
      </>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar
          style={currentTheme === "dark" ? "light" : "dark"}
          translucent
          backgroundColor="transparent"
        />
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
