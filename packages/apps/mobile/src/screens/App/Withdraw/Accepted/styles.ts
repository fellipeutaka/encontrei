import { FlatList, FlatListProps } from "react-native";

import { InventoryWithdrawAcceptedItems } from "src/@types/InventoryWithdraw";
import styled from "styled-components/native";


export const ItemList = styled(
  FlatList as new (
    props: FlatListProps<InventoryWithdrawAcceptedItems>
  ) => FlatList<InventoryWithdrawAcceptedItems>
).attrs({
  showsVerticalScrollIndicator: false,
})`
  height: 100%;
`;
