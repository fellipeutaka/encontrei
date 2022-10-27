import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mauve1};
  padding-top: 128px;
`;

export const OptionsContainer = styled.View`
  width: 86%;
`;

export const Options = styled.ScrollView``;
