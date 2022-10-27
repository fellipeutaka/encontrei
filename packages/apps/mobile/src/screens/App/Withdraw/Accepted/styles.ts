import { FlatList, FlatListProps } from "react-native";

import styled from "styled-components/native";

import { InventoryWithdrawAcceptedItems } from "@encontrei/types/InventoryWithdraw";

export const ItemList = styled(
  FlatList as new (
    props: FlatListProps<InventoryWithdrawAcceptedItems>
  ) => FlatList<InventoryWithdrawAcceptedItems>
).attrs({
  showsVerticalScrollIndicator: false,
})`
  height: 100%;
`;
