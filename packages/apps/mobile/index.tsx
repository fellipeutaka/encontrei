import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { registerRootComponent } from "expo";

import "react-native-url-polyfill/auto";

import { App } from "./src/App";

function Index() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <App />
    </SafeAreaProvider>
  );
}

export default registerRootComponent(Index);
