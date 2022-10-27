import { FlatList, FlatListProps } from "react-native";

import styled from "styled-components/native";

import { InventoryWithdrawItems } from "@encontrei/types/InventoryWithdraw";

export const ItemList = styled(
  FlatList as new (
    props: FlatListProps<InventoryWithdrawItems>
  ) => FlatList<InventoryWithdrawItems>
).attrs({
  showsVerticalScrollIndicator: false,
})`
  height: 100%;
`;
