import { FlatList, FlatListProps } from "react-native";

import { MotiView } from "moti";
import styled from "styled-components/native";

import { Inventory } from "@encontrei/types/Inventory";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mauve1};
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.mauve12};
  font-size: 18px;
  font-weight: 600;
`;

export const ItemsContainer = styled.View`
  width: 86%;
`;

export const ItemList = styled(
  FlatList as new (props: FlatListProps<Inventory>) => FlatList<Inventory>
).attrs({
  showsVerticalScrollIndicator: false,
})`
  height: 100%;
`;

export const AddButton = styled(MotiView)`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${({ theme }) => theme.colors.violet9};
  justify-content: center;
  align-items: center;
`;
