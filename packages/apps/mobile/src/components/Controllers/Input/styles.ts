import { TextInput } from "react-native";

import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconContainer = styled.View`
  position: absolute;
  left: 12px;
`;

export const EyeContainer = styled.TouchableOpacity`
  position: absolute;
  right: 12px;
  z-index: 1;
`;

export const StyledInput = styled(TextInput)`
  flex: 1;
  height: 44px;
  color: ${({ theme }) => theme.colors.mauve12};
  border-radius: 6px;
`;

export const Error = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const ErrorText = styled.Text`
  margin-left: 4px;
  color: red;
`;
