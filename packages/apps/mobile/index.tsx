import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { registerRootComponent } from "expo";

import "react-native-url-polyfill/auto";

import { SWRSupabaseProvider } from "@encontrei/contexts/SWRSupabaseContext";

import { App } from "./src/App";

function Index() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SWRSupabaseProvider>
        <App />
      </SWRSupabaseProvider>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(Index);
