import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { registerRootComponent } from "expo";

import "react-native-url-polyfill/auto";
import ThemeProvider from "@encontrei/contexts/ThemeContext";

import { App } from "./src/App";

function Index() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(Index);
