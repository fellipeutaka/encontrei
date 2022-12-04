import type { ParamListBase } from "@react-navigation/native";

export type HomeStackParamsList = {
  List: undefined;
  Details: {
    id: string;
    name: string;
    category: string;
    description: string;
    local: string;
    includedAt: string;
    photoUrl: string;
  };
  Add: undefined;
} & ParamListBase
