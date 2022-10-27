import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mauve1};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mauve12};
`;

export const Text = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.mauve11};
`;
