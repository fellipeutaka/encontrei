import { Dimensions, TextInput } from "react-native";

import styled from "styled-components/native";

import ButtonComponent from "@encontrei/components/Controllers/Select";

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.mauve1};
  padding: 12px 38px;
`;

export const Input = styled(TextInput)`
  flex: 1;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.mauve10};
  color: ${({ theme }) => theme.colors.mauve12};
  border-radius: 6px;
  margin: 12px 0;
  padding: 0 16px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin: 12px auto;
  width: ${72 * 2 + 12}px;
  justify-content: space-between;
`;

export const PhotoButton = styled(ButtonComponent)`
  width: 72px;
  background-color: ${({ theme }) => theme.colors.mauve7};
`;

export const SubmitButton = styled(ButtonComponent)`
  margin-bottom: 24px;
`;

export const ImagePreview = styled.Image`
  width: ${Dimensions.get("screen").width / 2}px;
  height: ${Dimensions.get("screen").width / 2}px;
  border-radius: 6px;
  align-self: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.mauve12};
  font-size: 18px;
`;
