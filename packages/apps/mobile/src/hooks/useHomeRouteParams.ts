import { RouteProp, useRoute } from "@react-navigation/native";

import type { HomeStackParamsList } from "@encontrei/types/routes/ParamsList/App/Home";

export function useHomeRouteParams<T extends keyof HomeStackParamsList>() {
  return useRoute<RouteProp<HomeStackParamsList, T>>();
}
