import styled from "styled-components/native";

import ButtonComponent from "@encontrei/components/Controllers/Button";
import LabelComponent from "@encontrei/components/General/Label";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mauve1};
  padding: 38px;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mauve12};
`;

export const Label = styled(LabelComponent)`
  margin: 32px 0;
`;

export const Button = styled(ButtonComponent)`
  margin-top: 92px;
  margin-bottom: 16px;
`;

export const ForgotButton = styled.TouchableOpacity`
  margin-top: 16px;
  align-self: flex-start;
`;

export const ForgotText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.mauve12};
`;
