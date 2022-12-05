import { FlatList, FlatListProps } from "react-native";

import { InventoryWithdrawRefusedItems } from "src/@types/InventoryWithdraw";
import styled from "styled-components/native";


export const ItemList = styled(
  FlatList as new (
    props: FlatListProps<InventoryWithdrawRefusedItems>
  ) => FlatList<InventoryWithdrawRefusedItems>
).attrs({
  showsVerticalScrollIndicator: false,
})`
  height: 100%;
`;
