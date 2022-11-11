import { FlatList, FlatListProps } from "react-native";

import styled from "styled-components/native";

import { InventoryWithdrawRefusedItems } from "@encontrei/types/InventoryWithdraw";

export const ItemList = styled(
  FlatList as new (
    props: FlatListProps<InventoryWithdrawRefusedItems>
  ) => FlatList<InventoryWithdrawRefusedItems>
).attrs({
  showsVerticalScrollIndicator: false,
})`
  height: 100%;
`;
