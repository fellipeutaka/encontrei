import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  margin-top: 16px;
`;

export const Text = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.mauve12};
`;
