import type { ParamListBase } from "@react-navigation/native";

import { Inventory } from "@encontrei/shared-constants";

export type HomeStackParamsList = {
  List: undefined;
  Details: Inventory;
  Add: undefined;
} & ParamListBase;
